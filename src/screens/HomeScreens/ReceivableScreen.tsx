import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconAdjustments,
  IconSearch,
  IconTrash,
  IconX,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {CardReceivable} from '../../components/cards/card-receivable';
import AddButton from '../../components/button/AddButton';
import {memo, useCallback, useContext, useEffect, useState} from 'react';
import isCloseToBottom from '../../lib/navigation';
import CheckBox from '@react-native-community/checkbox';
import FilterType from '../../components/FilterType';
import useFetch from '../../hooks/useFetch';
import days, {timeFormat} from '../../lib/time';
import Each from '../../components/Each';
import NotFound from '../../components/NotFound';
import ReceivableModal from '../../components/modal/ReceivableModal';
import ReceivableDetails from '../../components/modal/ReceivableDetails';
import {Receivable} from '../../global/types/Receivable';
import EditTransaction, {
  Edit,
} from '../../components/modal/transaction-modal/edit-transaction';
import useDelete from '../../hooks/useDelete';
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
import SearchInput from '../../components/SearchInput';

const ReceivableScreen = ({route}: {route: HomeScreenRouteProps}) => {
  const {dates, setDates} = useContext(DatesContext) as DatesContextInit;
  const setRecDate = (date: string[] | null) =>
    setDates(dates => ({...dates, receivable: date}));
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const {setNavHide, editMode} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);
  const [time, setTime] = [dates.receivable, setRecDate];
  const [paid, setPaid] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState<null | string>(null);
  const [edit, setEdit] = useState<Edit | null>(null);
  const [receivable, setReceivable] = useState<Receivable | null>(null);
  const [toggle, setToggle] = useState(false);
  const [totalReceivable, setTotalReceivable] = useState(0);
  const [debouncedSearch] = useDebounce(search, 2000);
  const {data, refresh} = useFetch<Receivable>({
    url: 'api/receivable',
    setRefreshing: setRefreshing,
    paid,
    time,
    search: debouncedSearch,
  });
  const {select, unSelect, itemSelected, deleteItem, deleteItems} = useDelete(
    'api/receivable',
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
    route.setRefresh(curr => ({...curr, receivable: refresh}));
  }, []);

  useEffect(() => {
    const total = data
      ?.map(debt => debt.total)
      .reduce((prev, curr) => prev + curr);
    setTotalReceivable(total || 0);
  }, [data]);

  useEffect(() => {
    if (!editMode) {
      setCheckbox(true);
      setTimeout(() => {
        setCheckbox(false);
      }, 0);
    }
  }, [editMode]);

  const deleteHandler = (id: number, name: string) => {
    MyAlert(
      'Hapus!!!',
      `Apakah anda ingin menghapus piutang "${name} ?"`,
      async () => {
        setRefreshing(true);
        const [resId, error] = await deleteItem(id);
        resId && refresh();
        error && ErrorHandler(error);
        setRefreshing(false);
      },
    );
  };

  const deleteManyHandler = () => {
    if (itemSelected.length == 0) return;
    MyAlert(
      'Hapus!!!',
      'Apakah anda ingin menghapus piutang yang dipilih ?',
      async () => {
        await deleteItems();
        setCheckbox(false);
      },
    );
  };
  const lastMonth = days().subtract(1, 'month');
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
            <SearchInput
              placeHolder={'Cari di piutang'}
              search={search}
              setSearch={setSearch}
              style={{marginLeft: 20}}
            />
            {!paid && (
              <View className="mr-4 flex-row items-center">
                <Text className="text-base text-accent font-sourceSansPro mr-3">
                  Total Piutang
                </Text>
                <ToggleButton {...{toggle, setToggle}} />
              </View>
            )}
          </>
        ) : (
          <View className="px-4 flex-row justify-between w-full items-center">
            <Text className="font-sourceSansProSemiBold text-base text-interaction">
              Pilih piutang
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
            Total Piutang
          </Text>
          <Text className="font-sourceSansProSemiBold text-lg text-err">
            {'Rp '}
            {currency(totalReceivable)}
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
          render={item => (
            <CardReceivable
              key={item.id}
              onPress={() => {
                setReceivable(item);
              }}
              checkValue={checkbox}
              id={item.id}
              onCheck={select}
              onUnCheck={unSelect}
              note={item.note}
              category={item.sale?.category || ''}
              created_at={timeFormat(item.created_at)}
              paid={item.paid}
              total={item.total}
              onEdit={() => {
                setEdit({
                  defaultValue: item,
                  title: item.sale?.name,
                  type: 'sale',
                });
              }}
              onDelete={() => deleteHandler(item.id, item.note)}
              onDetail={() => {
                setReceivable(item);
              }}
            />
          )}
          ifNull={<NotFound>Belum ada piutang</NotFound>}
        />
        <View className="h-20"></View>
      </ScrollView>
      <ReceivableModal {...{setShowModal, showModal, refresh}} />
      <ReceivableDetails {...{receivable, setReceivable, refresh}} />
      <EditTransaction {...{edit, setEdit, refresh}} />
    </View>
  );
};

export default memo(ReceivableScreen);
