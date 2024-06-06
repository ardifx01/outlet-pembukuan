import {Text, TextInput, View} from 'react-native';
import ToggleButton from '../../ToggleButton';
import {useContext, useEffect, useState} from 'react';
import Button from '../../button/Button';
import {IconCheck, IconX} from 'tabler-icons-react-native';
import colors from '../../../../assets/colors';
import {
  TrxModalContext,
  TrxModalInitialContext,
} from '../../../screens/HomeScreens/TransactionScreen';
import currency from '../../../lib/currency';
import http from '../../../lib/axios';
import {ErrorHandler} from '../../../lib/Error';
import {
  AuthContext,
  initAuthContext,
} from '../../../context/AuthenticationContext';

type Expense = {
  name: string;
  total: number;
};
type Debt = {
  note: string;
  total: number;
};

const ExpenseForm = () => {
  const [toggle, setToggle] = useState(false);
  const {setShowModal, showModal, refresh} = useContext(
    TrxModalContext,
  ) as TrxModalInitialContext;
  const [expense, setExpense] = useState<Expense | null>(null);
  const [debt, setDebt] = useState<Debt>({note: '', total: 0});
  const [validation, setValidation] = useState<string | null>(null);
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;

  const addExpense = async () => {
    if (
      !expense ||
      !expense.name ||
      !expense.total ||
      (toggle && (!debt.note || !debt.total))
    ) {
      setValidation('silahkan isi semua form');
      return;
    }
    const transaction = {
      name: expense.name,
      total: expense.total,
      debt: toggle ? debt : null,
    };
    setShowModal(false);
    setIsLoading(true);
    try {
      await http.post('api/transaction/expense', transaction);
      refresh();
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setExpense(null);
    setDebt({note: '', total: 0});
  }, [showModal]);
  useEffect(() => {
    setValidation(null);
  }, [toggle]);
  return (
    <View className="flex-1 justify-between pb-3">
      <View>
        <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
          Nama Pengeluaran
        </Text>
        <TextInput
          value={expense?.name}
          onChangeText={text =>
            setExpense(expense => ({...(expense as Expense), name: text}))
          }
          className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
        />
        <Text className="font-sourceSansProSemiBold text-base mt-3 pl-2 text-accent mr-4">
          Total
        </Text>
        <TextInput
          value={expense?.total ? currency(expense.total) : ''}
          onChangeText={text => {
            const total: number = parseInt(
              text.replace(/[^0-9]/g, '').slice(0, 9),
            );
            setExpense(expense => {
              return {
                ...(expense as Expense),
                total,
              };
            });
          }}
          inputMode="numeric"
          className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
        />

        <View className="mt-3 flex-row flex items-center">
          <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent mr-4">
            Utang
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
              value={debt?.note}
              onChangeText={text =>
                setDebt(debt => ({...(debt as Debt), note: text}))
              }
              className="bg-border px-3 rounded-md text-accent font-sourceSansProSemiBold text-base"
            />
            <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent mr-4">
              Total
            </Text>
            <TextInput
              value={debt?.total ? currency(debt.total) : ''}
              onChangeText={text => {
                const total: number = parseInt(
                  text.replace(/[^0-9]/g, '').slice(0, 9),
                );
                setDebt(debt => {
                  return {
                    ...(debt as Debt),
                    total,
                  };
                });
              }}
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
          onPress={addExpense}
          classname="bg-accent w-[45%]"
          textColor={'white'}>
          Tambahkan
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;
