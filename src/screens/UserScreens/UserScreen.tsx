import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../components/Header';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import {
  IconEdit,
  IconFileDescription,
  IconLogout,
  IconMessage,
  IconQuestionMark,
  IconSettings,
  IconShieldLock,
  IconUser,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './UserStack';
import useFetchUser from '../../hooks/useFetchUser';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const UserScreen = ({navigation, route}: Props) => {
  const {logout} = useContext(AuthContext) as initAuthContext;
  const [user, setUser] = useState({email: '', username: ''});
  const logoutHandler = async () => {
    await logout();
  };
  useEffect(() => {
    if (route.params?.username) {
      setUser(user => ({...user, username: route.params?.username as string}));
    }
  }, [route.params?.username]);

  useFetchUser(setUser);

  const confirmationAlert = () =>
    Alert.alert('Keluar', 'Apakah anda ingin keluar dari akun ini?', [
      {
        text: 'batal',
        style: 'cancel',
        onPress: () => {},
      },
      {text: 'Keluar', onPress: logoutHandler},
    ]);
  return (
    <View className="bg-white min-h-full">
      <Header>
        <Text className="text-white font-sourceSansProSemiBold px-4 py-[1px] text-2xl">
          Akun
        </Text>
      </Header>
      <View className="flex items-center mt-6">
        <View className="p-6 bg-border rounded-full">
          <IconUser size={80} color={colors.secondary} />
        </View>
        <Text className="font-sourceSansProSemiBold text-primary text-xl mt-4">
          {user.username}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Edit', user)}
          className="bg-secondary flex flex-row justify-center items-center py-1 px-6 rounded-full mt-3">
          <IconEdit size={22} color="#fff" />
          <Text className="text-white font-sourceSansProSemiBold text-lg ml-1">
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex gap-6 px-5 mt-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen', {user})}
          className="border-b-[1px] border-secondary pl-1 flex flex-row">
          <IconUser size={24} color={colors.primary} />
          <Text className="text-primary text-lg font-sourceSansProSemiBold pl-1">
            Profil
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Security')}
          className="border-b-[1px] border-secondary pl-1 flex flex-row">
          <IconShieldLock size={24} color={colors.primary} />
          <Text className="text-primary text-lg font-sourceSansProSemiBold pl-1">
            Keamanan akun
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ContactScreen')}
          className="border-b-[1px] border-secondary pl-1 flex flex-row">
          <IconMessage size={24} color={colors.primary} />
          <Text className="text-primary text-lg font-sourceSansProSemiBold pl-1">
            Hubungi kami
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="border-b-[1px] border-secondary pl-1 flex flex-row">
          <IconQuestionMark size={24} color={colors.primary} />
          <Text className="text-primary text-lg font-sourceSansProSemiBold pl-1">
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={confirmationAlert}
          className="border-b-[1px] border-secondary pl-1 flex flex-row">
          <IconLogout size={24} color={colors.primary} />
          <Text className="text-primary text-lg font-sourceSansProSemiBold pl-1">
            Keluar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserScreen;
