import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useContext} from 'react';
import Header from '../components/Header';
import {AuthContext, initAuthContext} from '../context/AuthenticationContext';
import {
  IconEdit,
  IconFileDescription,
  IconMessage,
  IconQuestionMark,
  IconSettings,
  IconShieldLock,
  IconTrash,
  IconUser,
} from 'tabler-icons-react-native';
import colors from '../../assets/colors';

const UserScreen = () => {
  const {logout} = useContext(AuthContext) as initAuthContext;
  const logoutHandler = async () => {
    await logout();
  };
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
        <TouchableOpacity
          onPress={confirmationAlert}
          className="mr-4 bg-err px-6 py-1 rounded-full">
          <Text className="text-white font-sourceSansProSemiBold text-base">
            Keluar
          </Text>
        </TouchableOpacity>
      </Header>
      <View className="flex items-center mt-6">
        <View className="p-6 bg-border rounded-full">
          <IconUser size={80} color={colors.secondary} />
        </View>
        <Text className="font-sourceSansProSemiBold text-primary text-xl mt-4">
          Username0980
        </Text>
        <TouchableOpacity className="bg-secondary flex flex-row justify-center items-center py-1 px-6 rounded-full mt-3">
          <IconEdit size={22} color="#fff" />
          <Text className="text-white font-sourceSansProSemiBold text-lg ml-1">
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex gap-6 px-5 mt-4">
        <TouchableOpacity className="border-b-[1px] border-secondary pl-1 flex flex-row">
          <IconFileDescription size={24} color={colors.primary} />
          <Text className="text-primary text-lg font-sourceSansProSemiBold pl-1">
            Catatan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="border-b-[1px] border-secondary pl-1 flex flex-row">
          <IconShieldLock size={24} color={colors.primary} />
          <Text className="text-primary text-lg font-sourceSansProSemiBold pl-1">
            Keamanan akun
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="border-b-[1px] border-secondary pl-1 flex flex-row">
          <IconSettings size={24} color={colors.primary} />
          <Text className="text-primary text-lg font-sourceSansProSemiBold pl-1">
            Pengaturan aplikasi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="border-b-[1px] border-secondary pl-1 flex flex-row">
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
        <TouchableOpacity className="border-b-[1px] border-secondary pl-1 flex flex-row">
          <IconTrash size={24} color={colors.primary} />
          <Text className="text-primary text-lg font-sourceSansProSemiBold pl-1">
            Hapus akun
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserScreen;
