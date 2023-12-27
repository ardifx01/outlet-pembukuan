import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {
  IconChartPie,
  IconDotsCircleHorizontal,
  IconFileDescription,
  IconShoppingBag,
} from 'tabler-icons-react-native';
import ProductScreen from '../screens/ProductScreen';
import colors from '../../assets/colors';
import ReportScreen from '../screens/ReportScreen';
import UserScreen from '../screens/UserScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primary,
          paddingTop: 13,
          paddingBottom: 13,
          height: '11%',
          paddingHorizontal: 10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({color, size}) => (
            <IconFileDescription color="#fff" size={33} stroke={1.5} />
          ),
          tabBarActiveBackgroundColor: colors.secondary,
          tabBarItemStyle: tabBarItemStyle,
          tabBarIconStyle: tabBarIconStyle,
          tabBarLabelStyle: tabBarLabelStyle,
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={{
          tabBarLabel: 'Produk',
          tabBarIcon: ({color, size}) => (
            <IconShoppingBag color="#fff" size={33} stroke={1.5} />
          ),
          tabBarActiveBackgroundColor: colors.secondary,
          tabBarItemStyle: tabBarItemStyle,
          tabBarIconStyle: tabBarIconStyle,
          tabBarLabelStyle: tabBarLabelStyle,
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          tabBarLabel: 'Laporan',
          tabBarIcon: ({color, size}) => (
            <IconChartPie color="#fff" size={33} stroke={1.5} />
          ),
          tabBarActiveBackgroundColor: colors.secondary,
          tabBarItemStyle: tabBarItemStyle,
          tabBarIconStyle: tabBarIconStyle,
          tabBarLabelStyle: tabBarLabelStyle,
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => (
            <IconDotsCircleHorizontal color="#fff" size={33} stroke={1.5} />
          ),
          tabBarActiveBackgroundColor: colors.secondary,
          tabBarItemStyle: tabBarItemStyle,
          tabBarIconStyle: tabBarIconStyle,
          tabBarLabelStyle: tabBarLabelStyle,
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;

const tabBarLabelStyle = {
  color: '#fff',
  fontFamily: 'SourceSanspro',
  fontSize: 11,
  marginTop: -10,
  paddingBottom: 5,
};
const tabBarIconStyle = {
  marginTop: -5,
};
const tabBarItemStyle = {
  borderRadius: 12,
  marginHorizontal: 15,
};
