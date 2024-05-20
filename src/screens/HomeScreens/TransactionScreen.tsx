import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {NavContext, navInitialContext} from '../../context/NavigationContext';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonOpt from '../../components/button/ButtonOption';
import {
  IconAdjustments,
  IconSearch,
  IconTrash,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {CardExpense, CardSale} from '../../components/cards/card-transaction';
import AddButton from '../../components/button/AddButton';
import TrxModal from '../../components/modal/transaction-modal/transaction-modal';
import isCloseToBottom from '../../lib/navigation';
import CheckBox from '@react-native-community/checkbox';
import FilterModal from '../../components/modal/FilterModal';
import http from '../../lib/axios';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import {ErrorHandler} from '../../lib/Error';
import {transaction} from '../../global/types/transaction';
import NotFound from '../../components/NotFound';

export type TrxModalInitialContext = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showFilterModal: boolean;
  setShowFilterModal: Dispatch<SetStateAction<boolean>>;
};
export const TrxModalContext = createContext<null | TrxModalInitialContext>(
  null,
);

const Transaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const {setNavHide, editMode} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);
  const [transactions, setTransactions] = useState<transaction>([]);
  const {logout, setIsLoading} = useContext(AuthContext) as initAuthContext;

  useEffect(() => {
    setIsLoading(true);
    http
      .get('/api/transaction')
      .then((res: any) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        ErrorHandler(err);
        // if (status == 404) setTransactions([]);
        // else return Alert.alert('Error', message);
      });
  }, []);

  const modalToggle = () => {
    setShowModal(true);
  };

  return (
    <View className={`bg-white flex flex-col min-h-full`}>
      <AddButton onPress={modalToggle} />
      <View className="flex flex-row pl-4 pr-5 py-5 justify-between">
        <View className="flex flex-row justify-between flex-1 mr-5">
          <ButtonOpt active={true} onPress={() => {}}>
            Hari ini
          </ButtonOpt>
          <ButtonOpt active={false} onPress={() => {}}>
            Minggu ini
          </ButtonOpt>
          <ButtonOpt active={false} onPress={() => {}}>
            Bulan ini
          </ButtonOpt>
        </View>
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <IconAdjustments size={30} color={colors.accent} />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between">
        <View className="ml-6 border-b-[1px] flex-row flex mt-1 pb-[5px] w-2/5 border-accent">
          <IconSearch size={23} color={colors.accent} />
          <TextInput
            className="p-0 mx-1 h-6 text-[15px]"
            placeholder="Cari di transaksi"
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
            <TouchableOpacity>
              <IconTrash color={colors.err} size={26} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className={`absolute bottom-0 left-0 right-0`} style={{top: 100}}>
        <ScrollView
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
          {transactions.length != 0 ? (
            transactions.map(trx => {
              if (trx.type == 'sale')
                return <CardSale {...trx} checkValue={checkbox} />;
              if (trx.type == 'expense')
                return <CardExpense {...trx} checkValue={checkbox} />;
            })
          ) : (
            <NotFound>Belum ada transaksi</NotFound>
          )}
        </ScrollView>
      </View>
      <TrxModalContext.Provider
        value={{setShowModal, showModal, setShowFilterModal, showFilterModal}}>
        <TrxModal />
        <FilterModal />
      </TrxModalContext.Provider>
    </View>
  );
};

export default Transaction;
