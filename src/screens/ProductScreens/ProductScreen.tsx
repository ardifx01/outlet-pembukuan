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
  IconFilterX,
  IconSearch,
  IconTrash,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {CardProduct} from '../../components/cards/card-product';
import AddButton from '../../components/button/AddButton';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import ProductModal from '../../components/modal/ProductModal';
import CheckBox from '@react-native-community/checkbox';
import Each from '../../components/Each';
import NotFound from '../../components/NotFound';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import {ErrorHandler} from '../../lib/Error';
import FilterProduct from '../../components/DropdownMultiple';
import MyAlert from '../../components/popup/MyAlert';
import {StockScreenRouteProps} from './StockScreen';
import {NavContext, navInitialContext} from '../../navigation/TabNavigation';
import {useDebounce} from 'use-debounce';
import {Category} from '../../global/types/category';
import SearchInput from '../../components/SearchInput';

export type Product = {
  id: number;
  name: string;
  category: {id: number; name: string};
  basic_price: number;
  selling_price: number;
};
const ProductScreen = ({route}: {route: StockScreenRouteProps}) => {
  const [showModal, setShowModal] = useState(false);
  const {editMode} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [debouncedSearch] = useDebounce(search, 1500);
  const [showFilter, setShowFilter] = useState(false);
  const {data: products, refresh} = useFetch<Product>({
    url: 'api/product/list',
    setRefreshing,
    search: debouncedSearch,
    categories: selected,
  });
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

  return (
    <View className="bg-white h-full">
      <AddButton onPress={() => setShowModal(true)} />
      <View className="flex-row justify-between items-center pt-2">
        <SearchInput
          style={{marginLeft: 24}}
          placeHolder={'Cari di produk'}
          search={search}
          setSearch={setSearch}
        />
        {!editMode ? (
          <View className="items-center flex-row justify-end flex-1 gap-x-2 mr-4">
            {selected.length != 0 && (
              <TouchableOpacity onPress={() => setSelected([])}>
                <IconFilterX color={colors.err} size={20} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setShowFilter(show => !show)}>
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
      <FilterProduct
        {...{showFilter, setShowFilter}}
        filter={selected}
        setFilter={setSelected}
      />
    </View>
  );
};

export default ProductScreen;
