import {NavigationContainer} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {
  AuthContext,
  AuthProvider,
  initAuthContext,
} from './src/context/AuthenticationContext';
import MyTabs from './src/navigation/TabNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';

const App = (): JSX.Element => {
  useEffect(() => {
    preloadDropdownComponents();
  }, []);
  return (
    <NavigationContainer>
      <AuthProvider>
        <Authentication />
      </AuthProvider>
    </NavigationContainer>
  );
};

const Authentication = () => {
  const {userToken} = useContext(AuthContext) as initAuthContext;
  return <>{userToken ? <MyTabs /> : <AuthNavigation />}</>;
};

export default App;

const preloadDropdownComponents = async () => {
  await import('react-native-element-dropdown');
  await import('react-native-chart-kit');
  await import('react-native-calendars');
};
