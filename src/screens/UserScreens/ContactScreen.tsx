import {Linking, Text, TouchableOpacity, View} from 'react-native';
import useHideNav from '../../hooks/useHideNav';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './UserStack';
import {IconMail} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {useCallback, useEffect, useState} from 'react';
import Each from '../../components/Each';
import {SvgUri} from 'react-native-svg';
import {httpd} from '../../lib/axios';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactScreen'>;
type Contact = {
  email: string;
  socmed: {platform: string; username: string; link: string; icon: string}[];
};

const ContactScreen = ({navigation}: Props) => {
  const [contacts, setContacts] = useState<Contact | null>(null);
  useHideNav(navigation);
  const fetchContact = useCallback(async () => {
    const res = await httpd.get('/contact');
    setContacts(res.data.data.contact);
  }, []);
  useEffect(() => {
    fetchContact();
  }, [fetchContact]);
  return (
    <View className="bg-main min-h-full px-3 py-4">
      <View className="bg-white rounded-xl px-5 py-4">
        <Text className="text-xl font-sourceSansProSemiBold text-primary">
          Butuh Bantuan
        </Text>
        <TouchableOpacity
          className="flex-row my-4 "
          onPress={() => Linking.openURL('mailto:' + contacts?.email || '')}>
          <View className="p-3 bg-border rounded-full">
            <IconMail size={24} color={colors.primary} />
          </View>
          <View className="ml-2">
            <Text className="text-lg font-sourceSansProSemiBold text-primary">
              Email
            </Text>
            <Text className="text-base font-sourceSansPro text-primary -mt-1">
              {contacts?.email}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-xl px-5 py-4 mt-4">
        <Text className="text-xl font-sourceSansProSemiBold text-primary">
          Hubungi developer
        </Text>
        <Each
          render={({platform, link, username, icon}) => (
            <TouchableOpacity
              className="flex-row my-3 "
              onPress={() => Linking.openURL(link)}>
              <View className="p-3 bg-border rounded-full">
                <SvgUri uri={icon} height={24} color={colors.primary} />
              </View>
              <View className="ml-2">
                <Text className="text-lg font-sourceSansProSemiBold text-primary">
                  {platform}
                </Text>
                <Text className="text-base font-sourceSansPro text-primary -mt-1">
                  {username}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          of={contacts?.socmed || null}
          ifNull={<></>}
        />
      </View>
    </View>
  );
};

export default ContactScreen;
