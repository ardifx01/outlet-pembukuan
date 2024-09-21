import {Text, View} from 'react-native';
import useHideNav from '../../hooks/useHideNav';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './UserStack';
import {IconUser} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;
const ProfileScreen = ({navigation, route}: Props) => {
  const {username, email} = route.params.user;
  useHideNav(navigation);
  return (
    <View className="bg-white min-h-full px-6">
      <View className="flex items-center mt-6">
        <View className="p-6 bg-border rounded-full">
          <IconUser size={80} color={colors.secondary} />
        </View>
        <View className="mb-1 mt-3">
          <Text className="font-sourceSansPro text-placeholder">Username</Text>
          <Text className="min-w-full text-primary border-b text-base py-[2px] border-border">
            {username}
          </Text>
        </View>
        <View className="mb-1 mt-3">
          <Text className="font-sourceSansPro text-placeholder">Email</Text>
          <Text className="min-w-full text-primary border-b text-base py-[2px] border-border">
            {email}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
