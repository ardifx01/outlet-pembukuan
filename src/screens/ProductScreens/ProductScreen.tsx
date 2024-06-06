import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import ButtonOpt from '../../components/button/ButtonOption';
import {
  IconAdjustments,
  IconFilter,
  IconInfoCircle,
  IconSearch,
  IconTrash,
  IconX,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {CardProduct} from '../../components/cards/card-product';
import AddButton from '../../components/button/AddButton';
import {useCallback, useContext, useEffect, useState} from 'react';
import ProductModal from '../../components/modal/ProductModal';
import {NavContext, navInitialContext} from '../../context/NavigationContext';
import CheckBox from '@react-native-community/checkbox';
import isCloseToBottom from '../../lib/navigation';
import Each from '../../components/Each';
import NotFound from '../../components/NotFound';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import ReactNativeModal from 'react-native-modal';
import {ErrorHandler} from '../../lib/Error';
import element from 'react-native-element-dropdown';
import MultiSelectComponent from '../../components/DropdownMultiple';

export type Product = {
  id: number;
  name: string;
  category: {id: number; name: string};
  basic_price: number;
  selling_price: number;
};
const ProductScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const {editMode, setNavHide} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {data: products, refresh} = useFetch<Product>({
    url: 'api/product/list',
    setRefreshing: setRefreshing,
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

  const deleteProduct = (item: Product) => {
    Alert.alert(
      'Hapus!!!',
      `Apakah anda ingin menghapus produk ${item.name}?`,
      [
        {
          text: 'Batal',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            setRefreshing(true);
            const [id, error] = await deleteItem(item.id);
            id && refresh();
            error && ErrorHandler(error);
            setRefreshing(false);
          },
        },
      ],
    );
  };

  const onDelete = () => {
    if (itemSelected.length == 0) return;
    Alert.alert(
      'Hapus!!!',
      'Apakah anda ingin mengahpus kategori yang dipilih?',
      [
        {
          text: 'Batal',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            await deleteItems();
            setCheckbox(false);
          },
        },
      ],
    );
    console.log(checkbox);
  };
  return (
    <View className="bg-white h-full">
      <AddButton onPress={() => setShowModal(true)} />
      <View className="my-2 flex-row items-center mx-5">
        <MultiSelectComponent />
        <TouchableOpacity className="flex-row items-center absolute left-[120px] top-2">
          <IconX color={colors.err} size={23} />
          {/* <Text className="text-err font-sourceSansPro">Bersihkan Filter</Text> */}
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between">
        <View className="ml-6 border-b-[1px] flex-row flex mt-1 pb-[5px] w-2/5 border-accent">
          <IconSearch size={23} color={colors.accent} />
          <TextInput
            className="p-0 mx-1 h-6 text-[15px]"
            placeholder="Cari di produk"
            placeholderTextColor={colors.accent}
          />
        </View>
        {editMode && (
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
        scrollEventThrottle={400}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setNavHide(true);
          } else {
            !editMode && setNavHide(false);
          }
        }}>
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
      </ScrollView>
      <ProductModal {...{setShowModal, showModal, refresh, edit}} />
    </View>
  );
};

export default ProductScreen;
