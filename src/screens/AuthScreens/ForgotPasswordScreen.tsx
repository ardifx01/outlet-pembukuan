import {useContext, useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import colors from '../../../assets/colors';
import {IconArrowNarrowLeft} from 'tabler-icons-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AuthNavigation';
import {emailRegex, sleep} from '../../lib/utils';
import {ErrorHandler, ResponseError} from '../../lib/Error';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import http from '../../lib/axios';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;
const ForgotPasswordScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;
  const submitHandler = async () => {
    if (!emailRegex.test(email))
      return Alert.alert('Invalid Email', 'Email tidak valid');
    try {
      setIsLoading(true);
      await http.post('/api/forgot-password', {email});
      setIsLoading(false);
      navigation.navigate('Verification', {type: 'reset', data: {email}});
    } catch (error: any) {
      setIsLoading(false);
      console.log(ErrorHandler(error));
    }
  };
  return (
    <View className="bg-border justify-center min-h-full items-center">
      <View className="bg-white py-8 px-7 rounded-lg shadow-md w-[90%]">
        <Text className="text-xl font-sourceSansProSemiBold text-primary text-center mb-3">
          Lupa Password ?
        </Text>
        <View className="justify-center items-center">
          <Text className="text-md font-sourceSansPro text-interaction mb-2">
            Masukkan email yang terdaftar.
          </Text>
          <TextInput
            id="email"
            value={email}
            placeholder="Masukkan email anda"
            className="py-1 text-primary font-sourceSansPro text-base border-border border px-4 rounded-md w-full"
            placeholderTextColor={colors.placeholder}
            onChangeText={text => setEmail(text)}
          />
          <TouchableOpacity
            // onPress={() =>
            //   navigation.navigate('Verification', {
            //     type: 'reset',
            //     data: {email: ''},
            //   })
            // }
            onPress={submitHandler}
            disabled={!email}
            className="my-5 bg-interaction w-full items-center py-2 rounded-lg">
            <Text className="font-sourceSansProSemiBold text-white text-base">
              Lanjutkan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center gap-x-1 justify-center"
            onPress={() => navigation.navigate('Login')}>
            <IconArrowNarrowLeft size={20} color={colors.placeholder} />
            <Text className={'text-placeholder font-sourceSansPro text-base'}>
              Kembali ke login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
