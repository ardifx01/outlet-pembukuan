import {Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {
  createContext,
  Dispatch,
  memo,
  SetStateAction,
  useState,
} from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from '../../../assets/colors';
import Transaction from './TransactionScreen';
import Receivable from './ReceivableScreen';
import Debt from './DebtScreen';
import Header, {HeaderBtn} from '../../components/Header';
import days from '../../lib/time';
import CalendarModal, {time} from '../../components/modal/CalendarModal';
import Announcement from "../../components/modal/Announcement";

export type HomeScreenRouteProps = {
  key: string;
  title: string;
  setRefresh: Dispatch<
    SetStateAction<{
      transaction: () => void;
      receivable: () => void;
      debt: () => void;
    }>
  >;
};
type DateSelector = {
  transaction: string[] | null;
  receivable: string[] | null;
  debt: string[] | null;
};
export type DatesContextInit = {
  dates: DateSelector;
  setDates: Dispatch<SetStateAction<DateSelector>>;
};
export const DatesContext = createContext<DatesContextInit | null>(null);
const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState({
    transaction: () => {},
    receivable: () => {},
    debt: () => {},
  });
  const [dates, setDates] = useState<DateSelector>({
    transaction: null,
    receivable: null,
    debt: null,
  });
  const [routes] = useState([
    {key: 'first', title: 'Transaksi', setRefresh, setDates, dates},
    {key: 'second', title: 'Piutang', setRefresh, setDates, dates},
    {key: 'third', title: 'Utang', setRefresh, setDates, dates},
  ]);
  const [showModal, setShowModal] = useState(false);
  const renderScene = SceneMap({
    first: Transaction,
    second: Receivable,
    third: Debt,
  });
  const setDate = (
    date: string[] | null,
    param: 'transaction' | 'debt' | 'receivable',
  ) =>
    setDates(dates => {
      const obj = {...dates};
      obj[param] = date;
      return obj;
    });
  const layout = useWindowDimensions();
  const [time, setTime] =
    index == 0
      ? [
          dates.transaction,
          (date: string[] | null) => setDate(date, 'transaction'),
        ]
      : index == 1
      ? [
          dates.receivable,
          (date: string[] | null) => setDate(date, 'receivable'),
        ]
      : [dates.transaction, (date: string[] | null) => setDate(date, 'debt')];

  const getDates = (date: string[] | null, nullcase: string) => {
    if (!date) return nullcase;
    const start = days(date[0]);
    const end = days(date[1]);
    if (start.format('DDMMYYYY') == end.format('DDMMYYYY')) {
      return start.format('DD MMMM YYYY');
    } else if (start.year() == end.year() && start.month() == end.month()) {
      return `${start.date()} - ${end.format('DD MMM YYYY')}`;
    } else if (start.year() == end.year()) {
      return `${start.format('DD MMM')} - ${end.format('DD MMM YYYY')}`;
    } else {
      return `${start.format('DD MMM YY')} - ${end.format('DD MMM YY')}`;
    }
  };

  const renderDates = () => {
    switch (index) {
      case 0:
        return getDates(dates.transaction, days().format('DD MMMM YYYY'));
      case 1:
        return getDates(dates.receivable, days().format('MMMM YYYY'));
      case 2:
        return getDates(dates.debt, days().format('MMMM YYYY'));
      default:
        break;
    }
  };

  return (
    <>
      <Header>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text className="font-sourceSansProSemiBold text-white bg-secondary py-2 px-6 rounded-full">
            {renderDates()}
          </Text>
        </TouchableOpacity>
        <HeaderBtn
          onRefresh={() => {
            switch (index) {
              case 0:
                refresh.transaction();
                break;
              case 1:
                refresh.receivable();
                break;
              case 2:
                refresh.debt();
                break;
              default:
                null;
            }
          }}
        />
      </Header>
      <DatesContext.Provider value={{dates, setDates}}>
        {/* Tab Area */}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={TabBarView}
        />
      </DatesContext.Provider>
      <CalendarModal
        setShowModal={setShowModal}
        showModal={showModal}
        setTime={setTime as (date: time) => void}
        time={time as time}
      />
      <Announcement />
    </>
  );
};

const TabBarView = (props: any) => (
  <TabBar
    {...props}
    style={{
      backgroundColor: '#fff',
      borderBottomColor: colors.accent,
      borderBottomWidth: 0.5,
      shadowColor: 'transparent',
    }}
    activeColor={colors.interaction}
    inactiveColor={colors.accent}
    indicatorStyle={{
      backgroundColor: 'transparent',
      borderBottomWidth: 2,
      borderColor: colors.interaction,
      width: '29.5%',
      marginLeft: '1.5%',
      borderRadius: 50,
    }}
    renderLabel={({route, focused, color}) => (
      <TouchableOpacity>
        <Text
          className="font-sourceSansProSemiBold text-lg"
          style={{color: color}}>
          {route.title}
        </Text>
      </TouchableOpacity>
    )}
  />
);
export default memo(HomeScreen);
