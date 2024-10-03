import {useContext, useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import colors from '../../../assets/colors';
import {Register, RootStackParamList} from '../../navigation/AuthNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import {ErrorHandler} from '../../lib/Error';
import http from '../../lib/axios';
import responseHandler from '../../lib/responseHandler';
import useCountdown from '../../hooks/useCountdown';
import {formatSeconds} from '../../lib/utils';
type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;

const VerificationScreen = ({navigation, route}: Props) => {
  const [otp, setOtp] = useState('');
  const {register, setIsLoading} = useContext(AuthContext) as initAuthContext;
  const {seconds, isRunning, startTimer} = useCountdown({initialSeconds: 120});

  const params = route.params;

  const reSendOtp = async () => {
    try {
      setIsLoading(true);
      if (params.type == 'register') {
        await http.post('/api/send-otp', {
          username: params.data.username,
          email: params.data.email,
        });
      } else {
        await http.post('/api/forgot-password', {
          email: params.data.email,
        });
      }
      setIsLoading(false);
      startTimer();
      Alert.alert('Sukses!', 'Kode otp berhasil dikirim');
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };

  useEffect(() => {
    startTimer();
  }, []);
  const resetPassHandler = async () => {
    try {
      setIsLoading(true);
      const res = await http.post('/api/verify-otp', {
        email: params.data.email,
        otp,
      });
      const response = responseHandler(res);
      setIsLoading(false);
      navigation.navigate('ResetPassword', {token: response.token});
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };
  const registerHandler = async () => {
    try {
      setIsLoading(true);
      await register({...(params.data as Register['data']), otp});
      setIsLoading(false);
      Alert.alert('Berhasil', 'Registrasi sukses silahkan Login', [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (err: any) {
      setIsLoading(false);
      ErrorHandler(err);
    }
  };
  return (
    <View className="flex min-h-full bg-border mx-6 justify-around">
      <View className="items-center">
        <Text className="text-xl text-primary font-sourceSansProSemiBold mt-8">
          Verifikasi <Text className="text-accent">Email</Text>
        </Text>
        <Text className="mt-3 text-lg text-center text-placeholder font-sourceSansPro">
          Silahkan masukkan kode otp yang di kirimkan ke email{' '}
          <Text className="font-sourceSansProSemiBold text-primary">
            {params.data.email}
          </Text>
        </Text>

        <OTPTextView
          handleTextChange={text => setOtp(text)}
          textInputStyle={{
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 2,
            borderBottomWidth: 2,
            padding: 3,
            width: 45,
            height: 45,
          }}
          tintColor={colors.secondary}
          autoFocus
          inputCount={6}
        />
        <View className="flex-row w-full justify-around mt-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="font-sourceSansProSemiBold text-accent mt-2">
              Email Salah?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={isRunning} onPress={reSendOtp}>
            <Text
              className={`font-sourceSansProSemiBold ${
                isRunning ? 'text-accent/50' : ' text-accent'
              } mt-2`}>
              Kirim Ulang {isRunning && formatSeconds(seconds)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        disabled={otp.length < 6}
        onPress={params.type == 'register' ? registerHandler : resetPassHandler}
        // onPress={() =>
        //   navigation.navigate('ResetPassword', {
        //     token: 'klj;adsjkadsjkdssdkjdsjkadjksjkladsjk',
        //   })
        // }
        className={`${
          otp.length < 6 ? 'bg-accent/50' : 'bg-accent'
        } w-full items-center py-2 rounded-full mb-10 self-end `}>
        <Text className="font-sourceSansProSemiBold text-lg text-white">
          Verifikasi
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationScreen;
