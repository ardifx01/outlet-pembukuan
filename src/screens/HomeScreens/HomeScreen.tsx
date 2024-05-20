import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {useContext, useState} from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from '../../../assets/colors';
import Transaction from './TransactionScreen';
import Receivable from './ReceivableScreen';
import Debt from './DebtScreen';
import Header, {HeaderBtn} from '../../components/Header';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Transaksi', test: 'test'},
    {key: 'second', title: 'Piutang'},
    {key: 'third', title: 'Utang'},
  ]);
  const renderScene = SceneMap({
    first: Transaction,
    second: Receivable,
    third: Debt,
  });
  const layout = useWindowDimensions();
  const {userToken} = useContext(AuthContext) as initAuthContext;

  return (
    <>
      <Header>
        <TouchableOpacity>
          <Text className="font-sourceSansProSemiBold text-white bg-secondary py-2 px-6 rounded-full">
            10 - 17 Des 2023
          </Text>
        </TouchableOpacity>
        <HeaderBtn onRefresh={() => {}} />
      </Header>
      <>
        {/* Tab Area */}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={TabBarView}
        />
      </>
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
export default HomeScreen;
