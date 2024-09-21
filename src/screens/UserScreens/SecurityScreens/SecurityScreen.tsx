import {Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import useHideNav from '../../../hooks/useHideNav';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../UserStack';
import {IconChevronRight, IconKey, IconMail} from 'tabler-icons-react-native';
import colors from '../../../../assets/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Security'>;

const SecurityScreen = ({navigation}: Props) => {
  useHideNav(navigation);
  return (
    <View className="min-h-full bg-white">
      <Text className="font-sourceSansProSemiBold text-center mt-2 text-base text-primary">
        Pengaturan Keamanan Akun
      </Text>
      <View className="flex gap-3 mt-2">
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateEmail')}
          className="border-b-[1px] border-secondary pl-1 flex-row px-5 py-1 items-center justify-between min-w-full">
          <View className="flex-row items-center">
            <IconMail size={24} color={colors.primary} />
            <Text className="text-primary text-lg font-sourceSansProSemiBold pl-2">
              Ubah Email
            </Text>
          </View>
          <IconChevronRight size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdatePassword')}
          className="border-b-[1px] border-secondary pl-1 flex-row px-5 py-1 items-center justify-between min-w-full">
          <View className="flex-row items-center">
            <IconKey size={24} color={colors.primary} />
            <Text className="text-primary text-lg font-sourceSansProSemiBold pl-2">
              Ubah Password
            </Text>
          </View>
          <IconChevronRight size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecurityScreen;
