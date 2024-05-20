import AppNav from './src/navigation/AppNavigation';
import {AuthProvider} from './src/context/AuthenticationContext';
import {MenuProvider} from 'react-native-popup-menu';

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <MenuProvider>
        <AppNav />
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
