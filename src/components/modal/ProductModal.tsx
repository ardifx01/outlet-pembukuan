import {
  Dimensions,
  LayoutChangeEvent,
  Text,
  TextInput,
  View,
} from 'react-native';
import ModalBody, {ModalState} from './ModalBody';
import {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import DropdownTextInput from '../DropdownTextInput';
import http from '../../lib/axios';
import {ErrorHandler} from '../../lib/Error';
import responseHandler from '../../lib/responseHandler';
import currency from '../../lib/currency';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';

type suggesstionsItem = {id: string; title: string};
type Product = {
  name: string;
  category_id: number;
  basic_price: number;
  selling_price: number;
};

const ProductModal = ({
  setShowModal,
  showModal,
  refresh,
}: ModalState & {refresh: () => void}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [headerOffset, setHeaderOffset] = useState(0);
  const [validation, setValidation] = useState('');
  const [suggestionsList, setSuggestionsList] = useState<suggesstionsItem[]>(
    [],
  );
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;
  const searchRef = useRef<LegacyRef<TextInput> | null>(null);

  const onOpenSuggestionsList = (isOpened: boolean) => {
    if (isOpened) {
      http
        .get('api/category/list')
        .then(res => {
          responseHandler(res, data => {
            const suggesstions = data.map((item: any) => ({
              id: item.id,
              title: item.name,
            }));
            setSuggestionsList(suggesstions);
          });
        })
        .catch(err => {
          setIsLoading(false);
          ErrorHandler(err);
        });
    }
  };
  const setCategory = (category: string) => {
    setProduct(product => ({
      ...(product as Product),
      category_id: parseInt(category),
    }));
  };

  const onLayout = (e: LayoutChangeEvent) => {
    setHeaderOffset(e.nativeEvent.layout.y + 20);
  };

  const submitHandler = async () => {
    if (
      !product ||
      !product.name ||
      !product.basic_price ||
      !product.category_id ||
      !product.selling_price
    ) {
      setValidation('silahkan isi semua form');
      return;
    }
    setShowModal(false);
    setIsLoading(true);
    try {
      const res = await http.post('api/product', product);
      console.log(res.status);
      refresh();
      setProduct(null);
    } catch (error) {
      console.log(error);
      ErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setValidation('');
  }, [headerOffset]);
  return (
    <ModalBody
      title="Tambah Produk"
      onSubmit={submitHandler}
      onCancel={() => {
        setProduct(null);
      }}
      height={'h-[480px] max-h-full'}
      {...{setShowModal, showModal, onLayout}}>
      <AutocompleteDropdownContextProvider headerOffset={headerOffset}>
        <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent">
          Nama Produk
        </Text>
        <TextInput
          value={product?.name ? product.name : ''}
          className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
          onChangeText={text => {
            setProduct(product => ({...(product as Product), name: text}));
          }}
        />

        <Text className="mt-3 font-sourceSansProSemiBold text-base pl-2 text-accent">
          Kategori
        </Text>
        <DropdownTextInput
          {...{headerOffset, onOpenSuggestionsList}}
          setSelect={setCategory}
          selected={product?.category_id ? product.category_id.toString() : ''}
          data={suggestionsList}
          placeHolder="Pilih Kategori"
          suggestionStyle={{
            marginLeft: -12,
            width: Dimensions.get('window').width * 0.9,
          }}
        />

        <Text className="font-sourceSansProSemiBold text-base text-accent pl-2 mt-3">
          Modal
        </Text>
        <View className="w-full flex-row items-center py-2 bg-border px-3 rounded-md">
          <Text className="font-sourceSansProSemiBold text-base text-primary">
            Rp.
          </Text>
          <TextInput
            maxLength={12}
            value={product?.basic_price ? currency(product?.basic_price) : ''}
            // value={product?.basic_price ? product.basic_price.toString() : ''}
            inputMode="numeric"
            className="py-0 px-2 rounded-md text-accent font-sourceSansProSemiBold w-full text-base"
            onChangeText={text => {
              const basic_price: number = parseInt(
                text.replace(/[^0-9]/g, '').slice(0, 9),
              );
              setProduct(product => {
                return {
                  ...(product as Product),
                  basic_price,
                };
              });
            }}
          />
        </View>
        <Text className="font-sourceSansProSemiBold text-base text-accent pl-2 mt-3">
          Harga
        </Text>
        <View className="w-full flex-row items-center py-2 bg-border px-3 rounded-md">
          <Text className="font-sourceSansProSemiBold text-base text-primary">
            Rp.
          </Text>
          <TextInput
            inputMode="numeric"
            maxLength={12}
            value={
              product?.selling_price ? currency(product?.selling_price) : ''
            }
            onChangeText={text => {
              const selling_price: number = parseInt(
                text.replace(/[^0-9]/g, '').slice(0, 9),
              );
              setProduct(product => {
                return {
                  ...(product as Product),
                  selling_price,
                };
              });
            }}
            className="py-0 px-2 rounded-md text-accent font-sourceSansProSemiBold w-full text-base"
          />
        </View>
        <Text className="font-sourceSansPro text-err mx-auto mt-2">
          {validation}
        </Text>
      </AutocompleteDropdownContextProvider>
    </ModalBody>
  );
};

export default ProductModal;
