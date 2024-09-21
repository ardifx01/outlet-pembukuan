import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import colors from '../../../assets/colors';
import {
  IconEye,
  IconEyeClosed,
  IconLock,
  IconMail,
  IconUser,
} from 'tabler-icons-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/AuthNavigation';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import http from '../../lib/axios';
import {ErrorHandler} from '../../lib/Error';

const RegisterScreen = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [credential, setCredential] = useState({
    username: '',
    email: '',
    password: '',
  });
  const {setError, error, setIsLoading} = useContext(
    AuthContext,
  ) as initAuthContext;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const submitHandler = async () => {
    if (!credential.email && !credential.username && !credential.password) {
      setError('Silahkan isi semua form');
      return;
    }
    try {
      setIsLoading(true);
      await http.post('/api/send-otp', {
        username: credential.username,
        email: credential.email,
      });
      setIsLoading(false);
      navigation.navigate('Verification', {type: 'register', data: credential});
    } catch (error: any) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };
  useEffect(() => {
    setError('');
  }, [navigation]);

  return (
    <View className="flex min-h-full items-center justify-around bg-border">
      <Text className="text-[40px] text-primary font-sourceSansProSemiBold mt-8">
        My <Text className="text-accent">Outlet</Text>
      </Text>
      <View className="bg-white px-6 py-8 rounded-lg w-[90%] flex items-center -mt-14 shadow-md">
        <Text className="text-[35px] text-primary m-auto mb-4 font-sourceSansProSemiBold">
          Sign <Text className="text-secondary">Up</Text>
        </Text>
        <Text className="text-base  text-placeholder font-sourceSansPro mb-2">
          Silahkan masukkan data anda
        </Text>
        {error && (
          <Text className="text-base text-err font-sourceSansPro -mt-1">
            {error}
          </Text>
        )}
        <View className="border-2 rounded-lg w-full px-3 border-border flex flex-row items-center mb-4 mt-1">
          <IconUser color={colors.accent} size={24} />
          <TextInput
            id="username"
            value={credential.username}
            placeholder="Masukkan username anda"
            className="py-2 text-primary w-[90%] font-sourceSansPro text-base ml-1"
            placeholderTextColor={colors.placeholder}
            onChangeText={text => {
              setCredential(credential => ({...credential, username: text}));
            }}
          />
        </View>
        <View className="border-2 rounded-lg w-full px-3 border-border flex flex-row items-center mb-4">
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
          // onPress={submitHandler}
          onPress={() =>
            navigation.navigate('Verification', {
              type: 'register',
              data: credential,
            })
          }
          className="bg-accent w-full items-center py-2 rounded-lg mb-10">
          <Text className="font-sourceSansProSemiBold text-lg text-white">
            Daftar
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row mb-4">
        <Text className="font-sourceSansPro text-base text-placeholder">
          Sudah punya akun?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="font-sourceSansPro text-base text-accent">
            Masuk disini
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
