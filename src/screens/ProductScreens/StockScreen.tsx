import {Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {Dispatch, memo, SetStateAction, useState} from 'react';
import Header, {HeaderBtn} from '../../components/Header';
import colors from '../../../assets/colors';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ProductScreen from './ProductScreen';
import CategoryScreen from './CategoryScreen';

export type StockScreenRouteProps = {
  key: string;
  title: string;
  setRefresh: Dispatch<
    SetStateAction<{
      product: () => void;
      category: () => void;
    }>
  >;
};

const StockScreen = () => {
  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState({
    product: () => {},
    category: () => {},
  });
  const [routes] = useState([
    {key: 'first', title: 'Produk', setRefresh},
    {key: 'second', title: 'Kategori', setRefresh},
  ]);
  const layout = useWindowDimensions();
  const renderScene = SceneMap({
    first: ProductScreen,
    second: CategoryScreen,
  });

  const refreshHandler = () => {
    switch (index) {
      case 0:
        refresh.product();
        break;
      case 1:
        refresh.category();
        break;
      default:
        null;
    }
  };
  return (
    <>
      <Header>
        <Text className="font-sourceSansProSemiBold text-white  px-5 rounded-full py-[1px] text-2xl">
          List Produk
        </Text>
        <HeaderBtn onRefresh={refreshHandler} />
      </Header>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={TabBarView}
      />
    </>
  );
};

export default memo(StockScreen);

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
      width: '45%',
      marginLeft: '1.5%',
      marginRight: '1.5%',
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
