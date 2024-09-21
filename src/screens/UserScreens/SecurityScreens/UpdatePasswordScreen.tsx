import {useContext, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../../assets/colors';
import ConfirmButton from '../../../components/button/ConfirmButton';
import {IconEye, IconEyeClosed} from 'tabler-icons-react-native';
import Input from '../../../components/input/Input';
import {
  AuthContext,
  initAuthContext,
} from '../../../context/AuthenticationContext';
import MyAlert from '../../../components/popup/MyAlert';
import {ErrorHandler} from '../../../lib/Error';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../UserStack';
import http from '../../../lib/axios';
import {
  hasEmptyProperty,
  isObjectEmpty,
  validatePassword,
} from '../../../lib/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'UpdatePassword'>;
const UpdatePasswordScreen = ({navigation}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;

  const saveHandler = async () => {
    MyAlert(
      'Konfirmasi ganti password!!!',
      'Apakaha anda yakin ingin menyimpan perubahan password ?',
      async () => {
        try {
          setIsLoading(true);
          await http.patch('/api/user/current', {
            passwordUpdate: password,
          });
          setIsLoading(false);
          Alert.alert('Sukses', 'Perubahan berhasil di simpan', [
            {
              onPress: () => navigation.navigate('Account'),
            },
          ]);
        } catch (error) {
          setIsLoading(false);
          ErrorHandler(error);
        }
      },
      'Simpan',
    );
  };

  return (
    <View className="px-6 min-h-full bg-white">
      <Text className="font-sourceSansProSemiBold text-center mt-2 text-base text-primary">
        Ganti Password
      </Text>
      <View className="mb-4 mt-3">
        <Text className="font-sourceSansPro text-placeholder">
          Masukkan password lama
        </Text>
        <Input
          value={password.oldPassword}
          onChangeText={text =>
            setPassword(password => ({...password, oldPassword: text}))
          }
          className="min-w-full text-primary border-b text-base py-[2px]  border-border"
          placeholder="old password"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
          onFocusStyle={{borderColor: colors.primary}}
        />
      </View>
      <View className="mb-4">
        <Text className="font-sourceSansPro text-placeholder">
          Masukkan password baru
        </Text>
        <View className="justify-center">
          <Input
            value={password.newPassword}
            onChangeText={text =>
              setPassword(password => ({...password, newPassword: text}))
            }
            className={`min-w-full text-primary text-base py-[2px] border-b border-border`}
            placeholder="new password"
            onFocusStyle={{
              borderColor: colors.primary,
            }}
            placeholderTextColor={colors.placeholder}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            className={`${!password.newPassword && 'hidden'} absolute right-2`}
            onPress={() => setShowPassword(show => !show)}>
            {showPassword ? (
              <IconEye color={colors.primary} />
            ) : (
              <IconEyeClosed color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
        {validatePassword(password.newPassword) && (
          <Text className="text-start text-xs text-err">
            *password minimal 8 karaakter
          </Text>
        )}
      </View>
      <ConfirmButton
        onPress={saveHandler}
        disabled={
          hasEmptyProperty(password) || validatePassword(password.newPassword)
        }
      />
    </View>
  );
};

export default UpdatePasswordScreen;
