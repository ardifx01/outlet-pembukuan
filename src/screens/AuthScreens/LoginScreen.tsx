import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import colors from '../../../assets/colors';
import {
  IconEye,
  IconEyeClosed,
  IconLock,
  IconMail,
} from 'tabler-icons-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AuthNavigation, {
  RootStackParamList,
} from '../../navigation/AuthNavigation';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';

const LoginScreen: React.FC = () => {
  const {login, userToken} = useContext(AuthContext) as initAuthContext;
  const [hidePassword, setHidePassword] = useState(true);
  const [credential, setCredential] = useState({
    email: 'user@mail.com',
    password: 'root',
  });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {error} = useContext(AuthContext) as initAuthContext;

  const loginHandler = async () => {
    if (!credential.email && !credential.password) {
      return;
    } else {
      await login(credential);
    }
  };
  return (
    <View className="flex min-h-full items-center justify-around bg-main">
      <Text className="text-[40px] text-primary font-sourceSansProSemiBold mt-8">
        My <Text className="text-accent">Outlet</Text>
      </Text>
      <View className="bg-white px-6 py-8 rounded-xl w-[90%] flex items-center -mt-14">
        <Text className="text-[35px] text-primary m-auto mb-4 font-sourceSansProSemiBold">
          Log<Text className="text-secondary">in</Text>
        </Text>
        <Text className="text-base  text-placeholder font-sourceSansPro mb-2">
          Silahkan masuk menggunakan akun anda
        </Text>
        {error && (
          <Text className="text-base text-err font-sourceSansPro -mt-1">
            {error}
          </Text>
        )}
        <View className="border-2 rounded-lg w-full px-3 border-border flex flex-row items-center mb-4 mt-2">
          <IconMail color={colors.accent} size={24} />
          <TextInput
            id="email"
            value={credential.email}
            placeholder="Masukkan email anda"
            className="py-2 text-primary w-[90%] font-sourceSansPro text-base ml-1"
            placeholderTextColor={colors.placeholder}
            onChangeText={text => {
              setCredential(credential => ({...credential, email: text}));
            }}
          />
        </View>
        <View className="border-2 rounded-lg w-full px-3 border-border flex flex-row items-center mb-7">
          <IconLock color={colors.accent} size={24} />
          <TextInput
            id="password"
            value={credential.password}
            placeholder="Masukkan password anda"
            className="py-2 text-primary w-[80%] font-sourceSansPro text-base ml-1"
            placeholderTextColor={colors.placeholder}
            secureTextEntry={hidePassword}
            onChangeText={text => {
              setCredential(credential => ({...credential, password: text}));
            }}
          />
          <TouchableOpacity
            className="ml-1"
            onPress={() => setHidePassword(!hidePassword)}>
            {credential.password.length != 0 ? (
              hidePassword ? (
                <IconEyeClosed color={colors.accent} size={24} />
              ) : (
                <IconEye color={colors.accent} size={24} />
              )
            ) : null}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={loginHandler}
          disabled={
            credential.email.length == 0 && credential.password.length == 0
              ? true
              : false
          }
          className="bg-accent w-full items-center py-2 rounded-lg mb-10">
          <Text className="font-sourceSansProSemiBold text-lg text-white">
            Login
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row">
          <Text className="font-sourceSansPro text-base text-placeholder">
            Lupa password?{' '}
          </Text>
          <TouchableOpacity>
            <Text className="font-sourceSansPro text-base text-accent">
              Atur ulang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row mb-4">
        <Text className="font-sourceSansPro text-base text-placeholder">
          Belum punya akun?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="font-sourceSansPro text-base text-accent">
            Buat disini
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
