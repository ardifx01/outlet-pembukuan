import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import React, {lazy} from 'react';
import {IconEdit, IconRefresh} from 'tabler-icons-react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from '../../assets/colors';
import {DebugInstructions} from 'react-native/Libraries/NewAppScreen';

const HomeScreens = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Transaksi'},
    {key: 'second', title: 'Piutang'},
    {key: 'third', title: 'Utang'},
  ]);
  const layout = useWindowDimensions();
  const renderScene = SceneMap({
    first: Transaction,
    second: Receivable,
    third: Debt,
  });
  return (
    <>
      <View className="flex flex-row py-5 bg-primary rounded-b-3xl justify-between px-5 items-center">
        <TouchableOpacity>
          <Text className="font-sourceSansProSemiBold text-white bg-secondary py-2 px-6 rounded-full">
            10 - 17 Des 2023
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row gap-7 pr-3">
          <TouchableOpacity>
            <IconRefresh size={31} color="#fff" stroke={1.5} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconEdit size={31} color="#fff" stroke={1.5} />
          </TouchableOpacity>
        </View>
      </View>
      <>
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

export default HomeScreens;

const Transaction = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;
const Receivable = () => <View style={{flex: 1, backgroundColor: '#ddd'}} />;
const Debt = () => <View style={{flex: 1, backgroundColor: '#aaa'}} />;
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
