import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import VerificationScreen from '../screens/AuthScreens/VerificationScreen';
import {memo} from 'react';
import ForgotPasswordScreen from '../screens/AuthScreens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/AuthScreens/ResetPasswordScreen';

export type Register = {
  type: 'register';
  data: {
    username: string;
    email: string;
    password: string;
  };
};
export type Reset = {
  type: 'reset';
  data: {
    email: string;
  };
};
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Verification: Reset | Register;
  ForgotPassword: undefined;
  ResetPassword: {token: string};
};

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default memo(AuthNavigation);
