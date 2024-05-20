import {
  LegacyRef,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Text, TextInput, View} from 'react-native';
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
  AutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown';
import colors from '../../../../assets/colors';
import {
  IconCheck,
  IconChevronDown,
  IconCircleX,
  IconX,
} from 'tabler-icons-react-native';
import ToggleButton from '../../ToggleButton';
import Button from '../../button/Button';
import {
  TrxModalContext,
  TrxModalInitialContext,
} from '../../../screens/HomeScreens/TransactionScreen';
import DropdownTextInput from '../../DropdownTextInput';
import Dropdown from '../../../Dropdown';
import {ScrollView} from 'react-native';
const SaleForm = ({headerOffset}: {headerOffset: number}) => {
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onOpenSuggestionsList = useCallback((isOpened: boolean) => {}, []);
  const {setShowModal} = useContext(TrxModalContext) as TrxModalInitialContext;
  const dataCategory = [
    {id: '1', title: 'Category 1'},
    {id: '2', title: 'Category 2'},
    {id: '3', title: 'Category 3'},
    {id: '4', title: 'Category 4'},
    {id: '5', title: 'Category 5'},
    {id: '6', title: 'Category 6'},
    {id: '7', title: 'Category 7'},
    {id: '8', title: 'Category 8'},
  ];
  const dataProduct = [
    {id: '1', title: 'Product 1'},
    {id: '2', title: 'Product 2'},
    {id: '3', title: 'Product 3'},
    {id: '4', title: 'Product 4'},
    {id: '5', title: 'Product 5'},
    {id: '6', title: 'Product 6'},
    {id: '7', title: 'Product 7'},
    {id: '8', title: 'Product 8'},
  ];
  return (
    <AutocompleteDropdownContextProvider {...{headerOffset}}>
      <View className="bg-white justify-between pb-3 flex-1">
        <View>
          <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
            Kategori
          </Text>
          <DropdownTextInput
            headerOffset={headerOffset}
            placeHolder="Pilih Kategori"
            selected={category}
            setSelect={setCategory}
            data={dataCategory}
          />
          <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
            Produk
          </Text>
          <DropdownTextInput
            headerOffset={headerOffset}
            selected={product}
            setSelect={setProduct}
            data={dataProduct}
            placeHolder="Pilih Produk"
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
                <TextInput className="bg-border py-1 px-3 rounded-md w-[75%] text-accent font-sourceSansProSemiBold text-base" />
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
                <TextInput className="bg-border py-1 px-3 rounded-md w-[75%] text-accent font-sourceSansProSemiBold text-base" />
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
                multiline={true}
                numberOfLines={3}
                style={{textAlignVertical: 'top'}}
                className="bg-border px-3 rounded-md text-accent font-sourceSansProSemiBold text-base"
              />
              <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent mr-4">
                Total
              </Text>
              <TextInput
                inputMode="numeric"
                className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
              />
            </View>
          )}
        </View>
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
            onPress={() => {}}
            classname="bg-accent w-[45%]"
            textColor={'white'}>
            Tambahkan
          </Button>
        </View>
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

export default SaleForm;
