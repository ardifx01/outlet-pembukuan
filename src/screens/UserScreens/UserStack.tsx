import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import UserScreen from './UserScreen';
import EditScreen from './EditScreen';
import colors from '../../../assets/colors';
import SecurityScreen from './SecurityScreens/SecurityScreen';
import {memo} from 'react';
import UpdateEmailScreen from './SecurityScreens/UpdateEmailScreen';
import UpdatePasswordScreen from './SecurityScreens/UpdatePasswordScreen';
import ProfileScreen from './ProfileScreen';

export type RootStackParamList = {
  Account:
    | undefined
    | {
        username: string;
      };
  Edit: {
    username: string;
    email: string;
  };
  Security: {} | undefined;
  UpdateEmail: {} | undefined;
  UpdatePassword: {} | undefined;
  ProfileScreen: {user: {username: string; email: string}};
};

const UserStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={UserScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={{
          title: 'Edit Profile',
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{
          title: 'Keamanan Akun',
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="UpdateEmail"
        component={UpdateEmailScreen}
        options={{
          title: 'Update Email',
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
        options={{
          title: 'Update Password',
          ...headerOption,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'My Profil',
          ...headerOption,
        }}
      />
    </Stack.Navigator>
  );
};

export default memo(UserStack);

const headerOption: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    fontFamily: 'SourceSansProSemiBold',
  },
  headerTintColor: 'white',
};
