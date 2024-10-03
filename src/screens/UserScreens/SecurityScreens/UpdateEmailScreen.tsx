import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../UserStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useContext, useEffect, useState} from 'react';
import colors from '../../../../assets/colors';
import useHideNav from '../../../hooks/useHideNav';
import ConfirmButton from '../../../components/button/ConfirmButton';
import {
  AuthContext,
  initAuthContext,
} from '../../../context/AuthenticationContext';
import {
  emailRegex,
  formatSeconds,
  inputNumber,
  sleep,
} from '../../../lib/utils';
import useCountdown from '../../../hooks/useCountdown';
import http from '../../../lib/axios';
import useFetchUser from '../../../hooks/useFetchUser';
import {IconEye, IconEyeClosed} from 'tabler-icons-react-native';
import {ErrorHandler} from '../../../lib/Error';

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateEmail'>;
const UpdateEmailScreen = ({navigation}: Props) => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [codeFocus, setCodeFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const {setIsLoading, logout} = useContext(AuthContext) as initAuthContext;
  const [getBtn, setGetBtn] = useState(false);
  const [user, setUser] = useState<{username: string; email: string}>({
    username: '',
    email: '',
  });
  useFetchUser(setUser);

  const {seconds, isRunning, startTimer} = useCountdown({initialSeconds: 120});

  useEffect(() => {
    if (!email || !emailValid || isRunning) {
      setGetBtn(false);
    } else setGetBtn(true);
  }, [isRunning, email, emailValid]);

  useHideNav(navigation);

  const emailValidation = (text: string) => {
    setEmail(text);
    if (!emailRegex.test(text)) setEmailValid(false);
    else setEmailValid(true);
  };

  useEffect(() => console.log(isRunning), [isRunning]);

  const getVerification = async () => {
    try {
      setIsLoading(true);
      await http.post('/api/send-otp', {username: user.username, email});
      setIsLoading(false);
      startTimer();
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };

  const saveHandler = async () => {
    try {
      setIsLoading(true);
      await http.patch('/api/user/update-email', {
        newEmail: email,
        otp,
        password,
      });
      setIsLoading(false);
      Alert.alert(
        'Sukses',
        'Email berhasil di update silahkan login kembali!',
        [{onPress: () => logout()}],
      );
    } catch (error: any) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };
  return (
    <View className="px-6 min-h-full bg-white">
      <Text className="font-sourceSansProSemiBold text-center mt-2 text-base text-primary">
        Pembaruan Email
      </Text>
      <View className="mb-1 mt-3">
        <Text className="font-sourceSansPro text-placeholder">
          Masukkan email baru
        </Text>
        <TextInput
          className={`min-w-full text-primary border-b text-base py-[2px] ${
            emailFocus
              ? !emailValid && email
                ? 'border-err'
                : 'border-primary'
              : 'border-border'
          }`}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          placeholder="example@mail.com"
          placeholderTextColor={colors.placeholder}
          onChangeText={emailValidation}
          autoCorrect={false}
        />
        <Text className="text-err text-xs">
          {!emailValid && email && '*email tidak valid'}
        </Text>
      </View>
      <Text className="font-sourceSansPro text-placeholder">
        Masukkan kode verifikasi
      </Text>
      <View className="flex-row items-center justify-between">
        <TextInput
          onChangeText={text => setOtp(inputNumber(text))}
          value={otp}
          className={`w-3/5 text-primary border-b text-base py-[2px] ${
            codeFocus ? 'border-primary' : 'border-border'
          }`}
          onFocus={() => setCodeFocus(true)}
          onBlur={() => setCodeFocus(false)}
          placeholder="kode verifikasi"
          placeholderTextColor={colors.placeholder}
        />
        <View>
          <TouchableOpacity
            onPress={getVerification}
            disabled={!getBtn}
            className={`px-3 py-2 rounded ${
              !getBtn ? 'bg-interaction/50' : 'bg-interaction'
            }`}>
            <Text className="text-white font-sourceSansProSemiBold">
              Dapatkan Kode
            </Text>
          </TouchableOpacity>
          {isRunning && (
            <View className="absolute -bottom-4 w-full items-center">
              <Text className="text-err text-xs font-sourceSansProSemiBold">
                Kirim ulang {formatSeconds(seconds)}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="mb-4 mt-5">
        <Text className="font-sourceSansPro text-placeholder">
          Konfirmasi password anda
        </Text>
        <TextInput
          onChangeText={text => setPassword(text)}
          className={`min-w-full text-primary border-b text-base py-[2px] ${
            passFocus ? 'border-primary' : 'border-border'
          }`}
          value={password}
          onFocus={() => setPassFocus(true)}
          onBlur={() => setPassFocus(false)}
          placeholder="Password"
          placeholderTextColor={colors.placeholder}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          className={`${!password && 'hidden'} absolute right-2 bottom-1`}
          onPress={() => setShowPassword(show => !show)}>
          {showPassword ? (
            <IconEye color={colors.primary} />
          ) : (
            <IconEyeClosed color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>
      <ConfirmButton
        onPress={saveHandler}
        disabled={!emailValid || !otp || !password}
      />
    </View>
  );
};

export default UpdateEmailScreen;
