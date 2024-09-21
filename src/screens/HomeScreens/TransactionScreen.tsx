import {
  createContext,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconAdjustments,
  IconBrandCashapp,
  IconSearch,
  IconTrash,
  IconX,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {CardExpense, CardSale} from '../../components/cards/card-transaction';
import AddButton from '../../components/button/AddButton';
import TrxModal from '../../components/modal/transaction-modal/transaction-modal';
import isCloseToBottom from '../../lib/navigation';
import CheckBox from '@react-native-community/checkbox';
import {expense, sale, transaction} from '../../global/types/transaction';
import NotFound from '../../components/NotFound';
import useFetch from '../../hooks/useFetch';
import Each from '../../components/Each';
import days from '../../lib/time';
import FilterType from '../../components/FilterType';
import {useDebounce} from 'use-debounce';
import useDelete from '../../hooks/useDelete';
import {ErrorHandler} from '../../lib/Error';
import DetailTransaction from '../../components/modal/transaction-modal/details-transaction';
import EditTransaction, {
  Edit,
} from '../../components/modal/transaction-modal/edit-transaction';
import MyAlert from '../../components/popup/MyAlert';
import {
  DatesContext,
  DatesContextInit,
  HomeScreenRouteProps,
} from './HomeScreen';
import {NavContext, navInitialContext} from '../../navigation/TabNavigation';
export type TrxModalInitialContext = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
};
export const TrxModalContext = createContext<null | TrxModalInitialContext>(
  null,
);

const Transaction = ({route}: {route: HomeScreenRouteProps}) => {
  const {dates, setDates} = useContext(DatesContext) as DatesContextInit;
  const setTrxDate = (date: string[] | null) =>
    setDates(dates => ({...dates, transaction: date}));
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const {setNavHide, editMode} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [date, setDate] = [dates.transaction, setTrxDate];
  const [type, setType] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [edit, setEdit] = useState<Edit | null>(null);
  const [detailTransaction, setDetailTransaction] = useState<
    sale<number> | expense<number> | null
  >(null);
  const [debouncedSearch] = useDebounce(search, 3000);
  const [sortedTransaction, setSortedTransaction] = useState<
    transaction<number>[] | null
  >(null);
  const {data: transactions, refresh} = useFetch<transaction>({
    url: 'api/transaction',
    setRefreshing: setRefreshing,
    time: date,
    type,
    search: debouncedSearch,
  });
  useEffect(() => {
    if (!transactions) {
      setSortedTransaction(null);
    } else {
      const sortTransaction = transactions.map(transaction => ({
        ...transaction,
        created_at: new Date(transaction.created_at).getTime(),
      }));
      setSortedTransaction(
        sortTransaction.sort((a, b) => b.created_at - a.created_at),
      );
    }
  }, [transactions]);
  const modalToggle = () => {
    setShowModal(true);
  };
  const {
    itemSelected: saleSelected,
    deleteItems: deleteSales,
    deleteItem: deleteSale,
    select: selectSale,
    unSelect: unSelectSale,
  } = useDelete('api/transaction/sale');
  const {
    itemSelected: expenseSelected,
    deleteItems: deleteExpenses,
    deleteItem: deleteExpense,
    select: selectExpense,
    unSelect: unSelectExpense,
  } = useDelete('api/transaction/expense');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    route.setRefresh(curr => ({...curr, transaction: refresh}));
  }, []);

  useEffect(() => {
    if (!editMode) {
      setCheckbox(true);
      setTimeout(() => {
        setCheckbox(false);
      }, 0);
    }
  }, [editMode]);

  const onDelete = () => {
    if (saleSelected.length == 0 && expenseSelected.length == 0) return;
    MyAlert(
      'Hapus!!!',
      'Apakah anda ingin mengahpus kategori yang dipilih?',
      async () => {
        try {
          const errorSale = await deleteSales(false);
          const errorExpense = await deleteExpenses(false);
          const errors = [...(errorSale || []), ...(errorExpense || [])];
          refresh();
          if (errors.length != 0) Alert.alert('Error', errors.join('\n'));
          setCheckbox(false);
        } catch (error) {
          ErrorHandler(error);
        }
      },
    );
  };

  const handleDelete = (item: sale<number> | expense<number>) => {
    MyAlert(
      'Hapus!!!',
      `Apakah anda ingin menghapus transaksi "${item.name}"?`,
      async () => {
        setRefreshing(true);
        const [id, error] =
          item.type == 'sale'
            ? await deleteSale(item.id)
            : await deleteExpense(item.id);
        id && refresh();
        error && ErrorHandler(error);
        setRefreshing(false);
      },
    );
  };

  return (
    <View className={`bg-white flex flex-col h-full pt-3`}>
      <AddButton onPress={modalToggle} />
      {!editMode && (
        <>
          <FilterType
            show={true}
            defaultTitle="Hari ini"
            title={['Minggu ini', 'Bulan ini']}
            types={[
              [
                days().startOf('week').toISOString(),
                days().endOf('week').toISOString(),
                'week',
              ],
              [
                days().startOf('month').toISOString(),
                days().endOf('month').toISOString(),
                'month',
              ],
            ]}
            {...{setType: setDate, type: date}}
          />
          <FilterType
            show={showFilter}
            title={['Penjualan', 'Pengeluaran']}
            types={['sale', 'expense']}
            {...{setType, type}}
          />
        </>
      )}
      <View className="flex-row justify-between">
        {!editMode ? (
          <View className="pl-6 pr-4 items-center flex-row justify-between w-full">
            <View className="border-b-[1px] flex-row flex mt-1 pb-[5px] w-2/5 border-accent">
              <IconSearch size={23} color={colors.accent} />
              <TextInput
                onChangeText={text => {
                  !text ? setSearch(null) : setSearch(text);
                }}
                value={search || ''}
                className="p-0 mx-1 h-6 text-[15px] text-accent"
                placeholder="Cari di transaksi"
                placeholderTextColor={colors.accent}
              />
            </View>
            <TouchableOpacity
              className="mt-2"
              onPress={() => setShowFilter(showFilter => !showFilter)}>
              {showFilter ? (
                <IconX size={30} color={colors.accent} />
              ) : (
                <IconAdjustments size={30} color={colors.accent} />
              )}
              {type && !showFilter && (
                <View className="absolute bg-err h-2 w-2 rounded-full -top-1 -right-1"></View>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View className="px-4 flex-row justify-between w-full items-center">
            <Text className="font-sourceSansProSemiBold text-base text-interaction">
              Pilih transaksi
            </Text>
            <View className="flex-row gap-x-2 items-center justify-end">
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
          </View>
        )}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        id="content"
        className="mt-4"
        scrollEventThrottle={400}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setNavHide(true);
          } else {
            !editMode && setNavHide(false);
          }
        }}>
        <Each<transaction<number>>
          of={sortedTransaction}
          render={(item, index) =>
            item.type == 'sale' ? (
              <CardSale
                {...item}
                onPress={() => {
                  setDetailTransaction(item);
                }}
                onCheck={selectSale}
                onUnCheck={unSelectSale}
                checkValue={checkbox}
                key={item.id}
                iconEdit={<IconBrandCashapp color={colors.warning} />}
                onDetail={() => {
                  setDetailTransaction(item);
                }}
                onDelete={() => {
                  handleDelete(item);
                }}
                onEdit={() => {
                  setEdit({
                    title: item.name,
                    id: item.id,
                    type: item.type,
                    defaultValue: item.receivable,
                  });
                }}
              />
            ) : (
              <CardExpense
                onPress={() => {
                  setDetailTransaction(item);
                }}
                onCheck={selectExpense}
                onUnCheck={unSelectExpense}
                {...item}
                checkValue={checkbox}
                key={item.id}
                iconEdit={<IconBrandCashapp color={colors.warning} />}
                onDetail={() => {
                  setDetailTransaction(item);
                }}
                onDelete={() => {
                  handleDelete(item);
                }}
                onEdit={() => {
                  setEdit({
                    title: item.name,
                    id: item.id,
                    type: item.type,
                    defaultValue: item.debt,
                  });
                }}
              />
            )
          }
          ifNull={<NotFound>Belum ada transaksi</NotFound>}
        />
        <View className="h-20"></View>
      </ScrollView>
      <TrxModalContext.Provider
        value={{
          setShowModal,
          showModal,
          refresh,
        }}>
        <TrxModal />
      </TrxModalContext.Provider>
      <DetailTransaction
        setTransaction={setDetailTransaction}
        transaction={detailTransaction}
      />
      <EditTransaction {...{edit, setEdit, refresh}} />
    </View>
  );
};

export default memo(Transaction);
