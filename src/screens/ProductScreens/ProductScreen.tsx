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
import {IconSearch, IconTrash} from 'tabler-icons-react-native';
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

export type Product = {
  id: number;
  name: string;
  category: {name: string};
  basic_price: number;
  selling_price: number;
};
const ProductScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const {editMode, setNavHide} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {data: products, refresh} = useFetch<Product>('api/product/list');
  const {itemSelected, deleteItems, select, unSelect} = useDelete(
    'api/product',
    refresh,
  );

  useEffect(() => {
    if (!editMode) {
      setCheckbox(true);
      setTimeout(() => {
        setCheckbox(false);
      }, 0);
    }
  }, [editMode]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  }, []);

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
      <View className="flex flex-row pl-4 pr-5 py-5 justify-between">
        <View className="flex flex-row justify-between flex-1 mr-5">
          <ButtonOpt active={true} onPress={() => {}}>
            Filter
          </ButtonOpt>
          <ButtonOpt active={false} onPress={() => {}}>
            Pulsa
          </ButtonOpt>
          <ButtonOpt active={false} onPress={() => {}}>
            Voucher
          </ButtonOpt>
          <ButtonOpt active={false} onPress={() => {}}>
            Kartu
          </ButtonOpt>
        </View>
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
          render={(item, index) => (
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
            />
          )}
          ifNull={<NotFound>Produk tidak ditemukan {' :('}</NotFound>}
        />
      </ScrollView>
      <ProductModal {...{setShowModal, showModal, refresh}} />
    </View>
  );
};

export default ProductScreen;
