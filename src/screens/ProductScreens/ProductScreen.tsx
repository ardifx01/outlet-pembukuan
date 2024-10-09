import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native';
import {
  IconAdjustments,
  IconSearch,
  IconTrash,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {CardProduct} from '../../components/cards/card-product';
import AddButton from '../../components/button/AddButton';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import ProductModal from '../../components/modal/ProductModal';
import CheckBox from '@react-native-community/checkbox';
import isCloseToBottom from '../../lib/navigation';
import Each from '../../components/Each';
import NotFound from '../../components/NotFound';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import {ErrorHandler} from '../../lib/Error';
import MultiSelectComponent from '../../components/DropdownMultiple';
import MyAlert from '../../components/popup/MyAlert';
import {IMultiSelectRef} from 'react-native-element-dropdown';
import {StockScreenRouteProps} from './StockScreen';
import {NavContext, navInitialContext} from '../../navigation/TabNavigation';
import {useDebounce} from 'use-debounce';
import http from '../../lib/axios';
import responseHandler from '../../lib/responseHandler';
import {Category} from '../../global/types/category';

export type Product = {
  id: number;
  name: string;
  category: {id: number; name: string};
  basic_price: number;
  selling_price: number;
};
const ProductScreen = ({route}: {route: StockScreenRouteProps}) => {
  const [showModal, setShowModal] = useState(false);
  const {editMode, setNavHide} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [debouncedSearch] = useDebounce(search, 1500);
  const [debouncedFilter] = useDebounce(selected, 2000);
  const {data: products, refresh} = useFetch<Product>({
    url: 'api/product/list',
    setRefreshing,
    search: debouncedSearch,
    category: debouncedFilter,
  });
  const {data: categories} = useFetch<Category>({
    url: 'api/category/list',
    setRefreshing,
  });
  const [categoryList, setCategoryList] = useState<
    Array<{label: string; value: string}>
  >([]);
  const {itemSelected, deleteItems, select, unSelect, deleteItem} = useDelete(
    'api/product',
    refresh,
  );
  const [edit, setEdit] = useState<Product | null>(null);

  useEffect(() => {
    if (!editMode) {
      setCheckbox(true);
      setTimeout(() => {
        setCheckbox(false);
      }, 0);
    }
  }, [editMode]);

  useEffect(() => {
    !showModal && edit && setEdit(null);
  }, [showModal]);

  useEffect(() => {
    if (!categories) return;
    setCategoryList(
      categories.map(category => ({
        label: category.name,
        value: category.id.toString(),
      })),
    );
  }, [categories]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    route.setRefresh(curr => ({...curr, product: refresh}));
  }, []);

  const deleteProduct = (item: Product) => {
    MyAlert(
      'Hapus!!!',
      `Apakah anda ingin menghapus produk ${item.name}?`,
      async () => {
        setRefreshing(true);
        const [id, error] = await deleteItem(item.id);
        id && refresh();
        error && ErrorHandler(error);
        setRefreshing(false);
      },
    );
  };

  const onDelete = () => {
    if (itemSelected.length == 0) return;
    MyAlert(
      'Hapus!!!',
      'Apakah anda ingin mengahpus kategori yang dipilih?',
      async () => {
        await deleteItems();
        setCheckbox(false);
      },
    );
  };

  const MultiSelectRef = useRef<IMultiSelectRef>(null);
  return (
    <View className="bg-white h-full">
      <AddButton onPress={() => setShowModal(true)} />
      <MultiSelectComponent
        ref={MultiSelectRef}
        {...{data: categoryList, selected, setSelected}}
      />
      <View className="flex-row justify-between items-center pt-2">
        <View className="ml-6 border-b-[1px] flex-row flex-1 mt-1 pb-[5px] w-2/5 border-accent">
          <IconSearch size={23} color={colors.accent} />
          <TextInput
            onChangeText={text => {
              !text ? setSearch(null) : setSearch(text);
            }}
            className="p-0 mx-1 h-6 text-[15px]"
            placeholder="Cari di produk"
            placeholderTextColor={colors.accent}
          />
        </View>
        {!editMode ? (
          <View className="items-center flex-row justify-end flex-1 mr-4">
            {selected.length != 0 && (
              <TouchableOpacity onPress={() => setSelected([])}>
                <Text className="mr-2 text-err font-sourceSansPro">
                  Hapus filter
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => MultiSelectRef.current?.open()}>
              <IconAdjustments color={colors.interaction} size={25} />
              {selected.length != 0 && (
                <View className="absolute bg-err h-2 w-2 rounded-full -top-1 -right-1"></View>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View className="px-4 flex-row gap-x-2 w-1/2 items-center justify-end">
            <CheckBox
              value={checkbox}
              tintColors={{true: colors.err, false: colors.err}}
              onValueChange={value => {
                setCheckbox(value);
              }}
            />
            <TouchableOpacity onPress={onDelete}>
              <IconTrash color={colors.err} size={26} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        id="content"
        className="mt-4 "
        scrollEventThrottle={400}>
        <Each<Product>
          of={products}
          render={item => (
            <CardProduct
              key={item.id}
              checkValue={checkbox}
              {...item}
              onCheck={() => {
                select(item.id);
              }}
              onUnCheck={() => {
                unSelect(item.id);
              }}
              onEdit={() => {
                console.log('edit');
                setEdit(item);
                setShowModal(true);
              }}
              onDelete={() => {
                deleteProduct(item);
              }}
            />
          )}
          ifNull={<NotFound>Produk tidak ditemukan {' :('}</NotFound>}
        />
        <View className="h-20"></View>
      </ScrollView>
      <ProductModal {...{setShowModal, showModal, refresh, edit}} />
    </View>
  );
};

export default ProductScreen;
