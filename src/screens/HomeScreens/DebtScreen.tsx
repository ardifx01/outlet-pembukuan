import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../assets/colors';
import {
  IconAdjustments,
  IconSearch,
  IconTrash,
  IconX,
} from 'tabler-icons-react-native';
import {CardDebt} from '../../components/cards/card-debt';
import AddButton from '../../components/button/AddButton';
import DebtModal from '../../components/modal/DebtModal';
import {memo, useCallback, useContext, useEffect, useState} from 'react';
import isCloseToBottom from '../../lib/navigation';
import CheckBox from '@react-native-community/checkbox';
import EditTransaction, {
  Edit,
} from '../../components/modal/transaction-modal/edit-transaction';
import {Debt} from '../../global/types/Debt';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import FilterType from '../../components/FilterType';
import days from '../../lib/time';
import Each from '../../components/Each';
import NotFound from '../../components/NotFound';
import DebtDetails from '../../components/modal/DebtDetails';
import MyAlert from '../../components/popup/MyAlert';
import {ErrorHandler} from '../../lib/Error';
import {
  DatesContext,
  DatesContextInit,
  HomeScreenRouteProps,
} from './HomeScreen';
import ToggleButton from '../../components/ToggleButton';
import currency from '../../lib/currency';
import {NavContext, navInitialContext} from '../../navigation/TabNavigation';
import {useDebounce} from 'use-debounce';

const DebtScreen = ({route}: {route: HomeScreenRouteProps}) => {
  const {setDates, dates} = useContext(DatesContext) as DatesContextInit;
  const setDebtDate = (date: string[] | null) =>
    setDates(dates => ({...dates, debt: date}));
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const {setNavHide, editMode} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);
  const [time, setTime] = [dates.debt, setDebtDate];
  // const [time, setTime] = useState<string[] | null>(null);
  const [paid, setPaid] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState<null | string>(null);
  const [edit, setEdit] = useState<Edit | null>(null);
  const [debt, setDebt] = useState<Debt | null>(null);
  const [toggle, setToggle] = useState(false);
  const [totalDebt, setTotalDebt] = useState(0);
  const [debouncedSearch] = useDebounce(search, 2000);
  const {data, refresh} = useFetch<Debt>({
    url: 'api/debt',
    setRefreshing: setRefreshing,
    paid,
    time,
    search: debouncedSearch,
  });
  const {select, unSelect, itemSelected, deleteItem, deleteItems} = useDelete(
    'api/debt',
    refresh,
  );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  }, []);
  const modalToggle = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (!editMode) {
      setCheckbox(true);
      setTimeout(() => {
        setCheckbox(false);
      }, 0);
    }
  }, [editMode]);

  useEffect(() => {
    route.setRefresh(curr => ({...curr, debt: refresh}));
  }, []);

  const deleteManyHandler = () => {
    if (itemSelected.length == 0) return;
    MyAlert(
      'Hapus!!!',
      'Apakah anda ingin menghapus utang yang dipilih ?',
      async () => {
        await deleteItems();
        setCheckbox(false);
      },
    );
  };

  const deleteHandler = (id: number, name: string) => {
    MyAlert(
      'Hapus!!!',
      `Apakah anda ingin menghapus utang "${name} ?"`,
      async () => {
        setRefreshing(true);
        const [resId, error] = await deleteItem(id);
        resId && refresh();
        error && ErrorHandler(error);
        setRefreshing(false);
      },
    );
  };

  const lastMonth = days().subtract(1, 'month');
  useEffect(() => {
    const total = data
      ?.map(debt => debt.total)
      .reduce((prev, curr) => prev + curr);
    setTotalDebt(total || 0);
  }, [data]);

  return (
    <View className="h-full bg-white pt-4">
      <AddButton onPress={modalToggle} />
      {!editMode && (
        <>
          <View className="flex flex-row pl-4 pr-5 pb-4 bg-white justify-between">
            <View className="flex flex-row justify-between mr-3 bg-border rounded-full flex-auto">
              <TouchableOpacity
                className={`${
                  paid ? 'bg-border' : 'bg-interaction'
                } py-2 items-center rounded-full flex-1`}
                onPress={() => {
                  setPaid(false);
                }}>
                <Text
                  className={`${
                    paid ? 'text-primary' : 'text-white'
                  } font-sourceSansProSemiBold text-base`}>
                  Belum Lunas
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  !paid ? 'bg-border' : 'bg-interaction'
                } py-2 items-center rounded-full flex-1`}
                onPress={() => {
                  setPaid(true);
                }}>
                <Text
                  className={`${
                    !paid ? 'text-primary' : 'text-white'
                  } font-sourceSansProSemiBold text-base`}>
                  Lunas
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setShowFilter(showFilter => !showFilter)}>
              {showFilter ? (
                <IconX size={30} color={colors.accent} />
              ) : (
                <IconAdjustments size={30} color={colors.accent} />
              )}
              {time && !showFilter && (
                <View className="absolute bg-err h-2 w-2 rounded-full -top-1 -right-1"></View>
              )}
            </TouchableOpacity>
          </View>
          <FilterType
            defaultTitle="Bulan Ini"
            show={showFilter}
            title={['Bulan Lalu', 'Tahun Ini']}
            types={[
              [
                lastMonth.startOf('month').toISOString(),
                lastMonth.endOf('month').toISOString(),
              ],
              [
                days().startOf('year').toISOString(),
                days().endOf('year').toISOString(),
              ],
            ]}
            {...{setType: setTime, type: time}}
          />
        </>
      )}
      <View className="flex-row justify-between items-center mb-2">
        {!editMode ? (
          <>
            <View className="ml-6 border-b-[1px] flex-row flex mt-1 pb-[5px] w-2/5 border-accent">
              <IconSearch size={23} color={colors.accent} />
              <TextInput
                onChangeText={text => {
                  !text ? setSearch(null) : setSearch(text);
                }}
                value={search || ''}
                className="p-0 mx-1 h-6 text-[15px]"
                placeholder="Cari di utang"
                placeholderTextColor={colors.accent}
              />
            </View>
            {!paid && (
              <View className="mr-4 flex-row items-center">
                <Text className="text-base text-accent font-sourceSansPro mr-3">
                  Total Utang
                </Text>
                <ToggleButton {...{toggle, setToggle}} />
              </View>
            )}
          </>
        ) : (
          <View className="px-4 flex-row justify-between w-full items-center">
            <Text className="font-sourceSansProSemiBold text-base text-interaction">
              Pilih utang
            </Text>
            <View className="px-4 flex-row gap-x-2 w-1/2 items-center justify-end">
              <CheckBox
                value={checkbox}
                tintColors={{true: colors.err, false: colors.err}}
                onValueChange={value => {
                  setCheckbox(value);
                }}
              />
              <TouchableOpacity onPress={deleteManyHandler}>
                <IconTrash color={colors.err} size={26} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {toggle && !editMode && !paid && (
        <View className="flex-row justify-between px-6 py-1 border-b border-b-border items-center mt-2">
          <Text className="font-sourceSansProSemiBold text-lg text-primary">
            Total Utang
          </Text>
          <Text className="font-sourceSansProSemiBold text-lg text-err">
            {'Rp '}
            {currency(totalDebt)}
          </Text>
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        id="content"
        className="mt-2"
        scrollEventThrottle={400}>
        <Each
          of={data}
          render={(item, index) => (
            <CardDebt
              key={item.id}
              onPress={() => {
                setDebt(item);
              }}
              onCheck={select}
              onUnCheck={unSelect}
              checkValue={checkbox}
              id={item.id}
              note={item.note}
              expense={item.expense}
              created_at={item.created_at}
              paid={item.paid}
              total={item.total}
              onDetail={() => {
                setDebt(item);
              }}
              onDelete={() => {
                deleteHandler(item.id, item.note);
              }}
              onEdit={() => {
                setEdit({
                  defaultValue: item,
                  type: 'expense',
                  title: item.expense?.name,
                });
              }}
            />
          )}
          ifNull={<NotFound>Beluma ada utang</NotFound>}
        />
        <View className="h-20"></View>
      </ScrollView>

      <DebtModal {...{setShowModal, showModal, refresh}} />
      <DebtDetails {...{refresh, setDebt, debt}} />
      <EditTransaction {...{edit, setEdit, refresh}} />
    </View>
  );
};

export default memo(DebtScreen);
