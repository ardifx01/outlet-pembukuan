import MyTabs from './src/tabs/BottomTabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default App;
