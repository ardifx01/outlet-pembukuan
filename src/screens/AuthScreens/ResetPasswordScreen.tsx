import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {IconEye, IconEyeClosed} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AuthNavigation';
import {useContext, useState} from 'react';
import {validatePassword} from '../../lib/utils';
import http from '../../lib/axios';
import {ErrorHandler} from '../../lib/Error';
import {err} from 'react-native-svg';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;
const ResetPasswordScreen = ({navigation, route}: Props) => {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;
  const submitHandler = async () => {
    const token = route.params.token;
    setIsLoading(true);
    try {
      await http.post(
        '/api/reset-pass',
        {
          newPassword,
        },
        {
          headers: {Authorization: 'Bearer ' + token},
        },
      );
      setIsLoading(false);
      Alert.alert('Sukses', 'Silahkan login kembali', [
        {onPress: () => navigation.navigate('Login')},
      ]);
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(err);
    }
  };
  return (
    <View className="bg-border justify-center min-h-full items-center">
      <View className="bg-white py-8 px-7 rounded-lg shadow-md w-[90%]">
        <Text className="text-xl font-sourceSansProSemiBold text-primary text-center mb-3">
          Reset Password
        </Text>
        <View className="justify-center items-center">
          <Text className="text-md font-sourceSansPro text-interaction mb-2">
            Silahkan masukkan password baru
          </Text>
          <View className="py-2 px-4 w-full border-border border rounded-md flex-row items-center justify-between">
            <TextInput
              id="email"
              value={newPassword}
              placeholder="Password baru"
              className=" text-primary font-sourceSansPro text-base p-0"
              placeholderTextColor={colors.placeholder}
              onChangeText={text => setNewPassword(text)}
              secureTextEntry={!showPassword}
            />
            {newPassword && (
              <TouchableOpacity onPress={() => setShowPassword(val => !val)}>
                {showPassword ? (
                  <IconEye size={23} color={colors.primary} />
                ) : (
                  <IconEyeClosed size={23} color={colors.primary} />
                )}
              </TouchableOpacity>
            )}
          </View>
          {validatePassword(newPassword) && (
            <Text className="text-start text-xs text-err w-full px-2">
              *password minimal 8 karaakter
            </Text>
          )}
          <TouchableOpacity
            disabled={validatePassword(newPassword)}
            onPress={submitHandler}
            className="my-5 bg-interaction w-full items-center py-2 rounded-lg">
            <Text className="font-sourceSansProSemiBold text-white text-base">
              Lanjutkan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center gap-x-1 justify-center"
            onPress={() => navigation.navigate('Login')}>
            <Text>Batalkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
