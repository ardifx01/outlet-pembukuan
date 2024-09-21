import {lazy, useCallback, useContext, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import colors from '../../../../assets/colors';
import {IconCheck, IconX} from 'tabler-icons-react-native';
import ToggleButton from '../../ToggleButton';
import Button from '../../button/Button';
import {
  TrxModalContext,
  TrxModalInitialContext,
} from '../../../screens/HomeScreens/TransactionScreen';
import DropdownTextInput from '../../DropdownTextInput';
import http from '../../../lib/axios';
import responseHandler from '../../../lib/responseHandler';
import {ErrorHandler} from '../../../lib/Error';
import DropdownComponent from '../../DropdownElement';
import currency from '../../../lib/currency';
import {
  AuthContext,
  initAuthContext,
} from '../../../context/AuthenticationContext';
import {isAxiosError} from 'axios';
export type Suggestions = {
  id: string;
  title: string;
  basic_price?: number;
  selling_price?: number;
  category?: string;
};
const SaleForm = ({headerOffset}: {headerOffset: number}) => {
  const [category, setCategory] = useState<string | null>(null);
  const [product, setProduct] = useState<Suggestions | null>(null);
  const [receivable, setReceivable] = useState<{
    note: string;
    total: number;
  }>({note: '', total: 0});
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emptyRes, setEmptyRes] = useState<string>();
  const [validation, setValidation] = useState<string | null>(null);
  const [dropdownTextInput, setDropdownTextInput] = useState<string>('');
  const {setShowModal, refresh} = useContext(
    TrxModalContext,
  ) as TrxModalInitialContext;
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;
  const [categoriesSuggestions, setCategoriesSuggestions] = useState<
    Suggestions[]
  >([]);
  const [productSuggestions, setProductSuggestions] = useState<
    Suggestions[] | null
  >([]);
  const getCategorySuggestions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await http.get('api/category/list');
      responseHandler(res, data => {
        const suggesstions = data.map((item: any) => ({
          id: item.id,
          title: item.name,
        }));
        setLoading(false);
        setCategoriesSuggestions(suggesstions);
      });
    } catch (err) {
      setLoading(false);
      ErrorHandler(err);
    }
  }, []);
  const getProductSuggestions = useCallback(
    async (search: string) => {
      setDropdownTextInput(search);
      if (!category) {
        console.log('no category');
        setEmptyRes('Pilih kategori terlebih dahulu');
        setProductSuggestions([]);
        return;
      }
      if (search.length < 2) return;
      setLoading(true);
      try {
        const res = await http.get('api/product/list', {
          params: {
            filter: [category],
            search,
          },
        });
        responseHandler(res, data => {
          console.log(data);
          const suggesstions = data.map((item: any) => ({
            id: item.id,
            title: item.name,
            basic_price: item.basic_price,
            selling_price: item.selling_price,
            category: item.category.name,
          }));
          setLoading(false);
          setProductSuggestions(suggesstions);
        });
      } catch (err) {
        if (isAxiosError(err) && err.response?.status) {
          setEmptyRes('Tidak ditemukan produk');
          setProductSuggestions([]);
        }
        setLoading(false);
        ErrorHandler(err);
      }
    },
    [category],
  );

  const onSubmit = async () => {
    if (
      !product ||
      (!product.title && !dropdownTextInput) ||
      !product.basic_price ||
      (!product.category && !category) ||
      !product.selling_price ||
      (toggle && (!receivable.note || !receivable.total))
    ) {
      console.log(product);
      setValidation('silahkan isi semua form');
      return;
    }
    !product.title && dropdownTextInput
      ? console.log(dropdownTextInput)
      : console.log(product.title);
    const transaction = {
      name: product.title || dropdownTextInput,
      category: product.category || category,
      basic_price: product.basic_price,
      selling_price: product.selling_price,
      receivable: toggle ? receivable : null,
    };
    setShowModal(false);
    setIsLoading(true);
    try {
      await http.post('api/transaction/sale', transaction);
      refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };

  useEffect(() => {
    setValidation(null);
  }, [toggle]);

  useEffect(() => {
    getCategorySuggestions();
  }, []);

  useEffect(() => {
    console.log(productSuggestions);
  }, [productSuggestions]);

  return (
    <View className="bg-white justify-between pb-3 flex-1">
      <AutocompleteDropdownContextProvider {...{headerOffset}}>
        <View>
          <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
            Kategori
          </Text>
          <DropdownComponent
            data={categoriesSuggestions}
            value={product?.category || category}
            setValue={setCategory}
          />
          <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
            Produk
          </Text>
          <DropdownTextInput
            emptyRes={emptyRes}
            headerOffset={headerOffset}
            selected={product?.id || ''}
            onChangeText={getProductSuggestions}
            setSelect={setProduct}
            data={productSuggestions}
            placeHolder="Cari Produk"
            useFilter={false}
            debounce={1500}
            fixOpenSuggestion={false}
            loading={loading}
            onFocus={() => setProductSuggestions(null)}
          />
          <View className="flex flex-row justify-between mt-2 ">
            <View className="w-[48%] justify-center flex items-center">
              <Text className="font-sourceSansProSemiBold text-base text-accent">
                Modal
              </Text>
              <View className=" mt-1 w-full flex-row items-center gap-1">
                <Text className="font-sourceSansProSemiBold text-base text-primary">
                  Rp.
                </Text>
                <TextInput
                  value={
                    product?.basic_price ? currency(product.basic_price) : ''
                  }
                  onChangeText={text => {
                    const basic_price: number = parseInt(
                      text.replace(/[^0-9]/g, '').slice(0, 9),
                    );
                    setProduct(product => ({
                      ...(product as Suggestions),
                      basic_price,
                    }));
                  }}
                  inputMode="numeric"
                  className="bg-border py-1 px-3 rounded-md w-[75%] text-accent font-sourceSansProSemiBold text-base"
                />
              </View>
            </View>
            <View className="w-[48%] flex justify-end">
              <Text className="font-sourceSansProSemiBold text-base text-accent self-center pl-8">
                Harga
              </Text>
              <View className=" mt-1 w-full flex-row flex items-center gap-1 justify-end">
                <Text className="font-sourceSansProSemiBold text-base text-primary">
                  Rp.
                </Text>
                <TextInput
                  value={
                    product?.selling_price
                      ? currency(product.selling_price)
                      : ''
                  }
                  onChangeText={text => {
                    const selling_price: number = parseInt(
                      text.replace(/[^0-9]/g, '').slice(0, 9),
                    );
                    setProduct(product => ({
                      ...(product as Suggestions),
                      selling_price,
                    }));
                  }}
                  inputMode="numeric"
                  className="bg-border py-1 px-3 rounded-md w-[75%] text-accent font-sourceSansProSemiBold text-base"
                />
              </View>
            </View>
          </View>
          <View className="mt-3 flex-row flex items-center">
            <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent mr-4">
              Piutang
            </Text>
            <ToggleButton {...{setToggle, toggle}} />
          </View>
          {toggle && (
            <View className="p-2 border-placeholder/40 border-dashed border-2 mt-3 ">
              <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent mr-4">
                Catatan
              </Text>
              <TextInput
                onChangeText={text => {
                  setReceivable(receivable => ({...receivable, note: text}));
                }}
                value={receivable.note}
                multiline={true}
                numberOfLines={3}
                style={{textAlignVertical: 'top'}}
                className="bg-border px-3 rounded-md text-accent font-sourceSansProSemiBold text-base"
              />
              <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent mr-4">
                Total
              </Text>
              <TextInput
                onChangeText={text => {
                  const total: number = parseInt(
                    text.replace(/[^0-9]/g, '').slice(0, 9),
                  );
                  setReceivable(receivable => {
                    return {
                      ...receivable,
                      total,
                    };
                  });
                }}
                value={receivable.total ? currency(receivable.total) : ''}
                inputMode="numeric"
                className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
              />
            </View>
          )}
          {validation && (
            <Text className="font-sourceSansPro text-err mx-auto mt-2 -mb-1">
              {validation}
            </Text>
          )}
        </View>
      </AutocompleteDropdownContextProvider>

      <View className="flex flex-row justify-around mt-3 w-full">
        <Button
          icon={<IconX size={20} color={colors.primary} />}
          onPress={() => {
            setShowModal(false);
          }}
          classname="bg-border w-[45%]"
          textColor={colors.primary}>
          Batalkan
        </Button>
        <Button
          icon={<IconCheck size={20} color={'white'} />}
          onPress={onSubmit}
          classname="bg-accent w-[45%]"
          textColor={'white'}>
          Tambahkan
        </Button>
      </View>
    </View>
  );
};

export default SaleForm;
