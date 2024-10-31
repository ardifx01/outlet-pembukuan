import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import {
  IconChartPie,
  IconDotsCircleHorizontal,
  IconFileDescription,
  IconShoppingBag,
} from 'tabler-icons-react-native';
import colors from '../../assets/colors';
import ReportScreen from '../screens/ReportScreen/ReportScreen';
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Animated, Keyboard} from 'react-native';
import StockScreen from '../screens/ProductScreens/StockScreen';
import UserStack from '../screens/UserScreens/UserStack';
import {MenuProvider} from 'react-native-popup-menu';
import {Calendar} from 'react-native-calendars';

export type navInitialContext = {
  navHide: boolean;
  setNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export const NavContext = createContext<null | navInitialContext>(null);

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const [navHide, setNavHide] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const hiddenValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setNavHide(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      !editMode && setNavHide(false);
    });
    if (navHide) {
      Animated.timing(hiddenValue, {
        toValue: 88,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(hiddenValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [navHide, editMode]);

  useEffect(() => {
    if (editMode) setNavHide(true);
    else setNavHide(false);
  }, [editMode]);
  return (
    <MenuProvider>
      <NavContext.Provider value={{navHide, setNavHide, editMode, setEditMode}}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                backgroundColor: colors.primary,
                paddingTop: 10,
                paddingBottom: 10,
                height: 80,
                paddingHorizontal: 10,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                transform: [{translateY: hiddenValue}],
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
              name="Stock"
              component={StockScreen}
              options={{
                tabBarLabel: 'Stok',
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
              component={UserStack}
              options={{
                tabBarLabel: 'More',
                tabBarIcon: ({color, size}) => (
                  <IconDotsCircleHorizontal
                    color="#fff"
                    size={33}
                    stroke={1.5}
                  />
                ),
                tabBarActiveBackgroundColor: colors.secondary,
                tabBarItemStyle: tabBarItemStyle,
                tabBarIconStyle: tabBarIconStyle,
                tabBarLabelStyle: tabBarLabelStyle,
              }}
            />
          </Tab.Navigator>
        </Animated.View>
      </NavContext.Provider>
    </MenuProvider>
  );
};

export default memo(MyTabs);

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
