import AppNav from './src/navigation/AppNavigation';
import {AuthProvider} from './src/context/AuthenticationContext';
import {MenuProvider} from 'react-native-popup-menu';
import element from 'react-native-element-dropdown';

const App = (): JSX.Element => {
  console.log(element);
  return (
    <AuthProvider>
      <MenuProvider>
        <AppNav />
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
