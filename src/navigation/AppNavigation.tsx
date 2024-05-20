import React, {useContext, useEffect} from 'react';
import {AuthContext, initAuthContext} from '../context/AuthenticationContext';
import MyTabs from './TabNavigation';
import AuthNavigation from './AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import NavProvider from '../context/NavigationContext';

const AppNav = () => {
  const {userToken} = useContext(AuthContext) as initAuthContext;
  return (
    <NavigationContainer>
      {userToken ? (
        <NavProvider>
          <MyTabs />
        </NavProvider>
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default AppNav;
