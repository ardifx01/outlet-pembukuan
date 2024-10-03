import {Linking, Text, TouchableOpacity, View} from 'react-native';
import useHideNav from '../../hooks/useHideNav';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './UserStack';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconMail,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactScreen'>;

const ContactScreen = ({navigation}: Props) => {
  useHideNav(navigation);
  return (
    <View className="bg-main min-h-full px-3 py-4">
      <View className="bg-white rounded-xl px-5 py-4">
        <Text className="text-xl font-sourceSansProSemiBold text-primary">
          Butuh Bantuan
        </Text>
        <TouchableOpacity
          className="flex-row my-4 "
          onPress={() => Linking.openURL('mailto:myoutlet.cs@gmail.com')}>
          <View className="p-3 bg-border rounded-full">
            <IconMail size={24} color={colors.primary} />
          </View>
          <View className="ml-2">
            <Text className="text-lg font-sourceSansProSemiBold text-primary">
              Email
            </Text>
            <Text className="text-base font-sourceSansPro text-primary -mt-1">
              myoutlet.cs@gmail.com
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-xl px-5 py-4 mt-4">
        <Text className="text-xl font-sourceSansProSemiBold text-primary">
          Temukan Kami
        </Text>
        <TouchableOpacity className="flex-row my-3 ">
          <View className="p-3 bg-border rounded-full">
            <IconBrandInstagram size={24} color={colors.primary} />
          </View>
          <View className="ml-2">
            <Text className="text-lg font-sourceSansProSemiBold text-primary">
              Instagram
            </Text>
            <Text className="text-base font-sourceSansPro text-primary -mt-1">
              myoutlet.cs@gmail.com
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row my-3 ">
          <View className="p-3 bg-border rounded-full">
            <IconBrandTwitter size={24} color={colors.primary} />
          </View>
          <View className="ml-2">
            <Text className="text-lg font-sourceSansProSemiBold text-primary">
              Twitter
            </Text>
            <Text className="text-base font-sourceSansPro text-primary -mt-1">
              myoutlet.cs@gmail.com
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactScreen;
