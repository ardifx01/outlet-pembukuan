import {NavigationContainer} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {
  AuthContext,
  AuthProvider,
  initAuthContext,
} from './src/context/AuthenticationContext';
import MyTabs from './src/navigation/TabNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';
import SplashScreen from 'react-native-splash-screen';
import Announcement from './src/components/modal/Announcement';
import {AxiosProvider} from './src/context/AxiosProvider';

const App = (): JSX.Element => {
  useEffect(() => {
    preloadDropdownComponents();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    <NavigationContainer>
      <AuthProvider>
        <Announcement />
        <Authentication />
      </AuthProvider>
    </NavigationContainer>
  );
};

const Authentication = () => {
  const {userToken} = useContext(AuthContext) as initAuthContext;
  return (
    <AxiosProvider>{userToken ? <MyTabs /> : <AuthNavigation />}</AxiosProvider>
  );
};

export default App;

const preloadDropdownComponents = async () => {
  await import('react-native-element-dropdown');
  await import('react-native-chart-kit');
  await import('react-native-calendars');
};
