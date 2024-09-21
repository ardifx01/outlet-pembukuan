import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useContext, useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from './UserStack';
import http from '../../lib/axios';
import {ErrorHandler} from '../../lib/Error';
import useHideNav from '../../hooks/useHideNav';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import ConfirmButton from '../../components/button/ConfirmButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;
const EditScreen = ({navigation, route}: Props) => {
  const [name, setName] = useState(route.params.username);

  const {setIsLoading} = useContext(AuthContext) as initAuthContext;

  useHideNav(navigation);

  const saveHandler = async () => {
    if (!name) return;
    if (name == route.params.username) navigation.navigate('Account');
    try {
      setIsLoading(true);
      await http.patch('/api/user/current', {
        username: name,
      });
      setIsLoading(false);
      navigation.navigate('Account', {username: name});
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };
  return (
    <View className="min-h-full bg-white px-4 pt-7">
      <Text className="font-sourceSansProSemiBold text-base">Nama</Text>
      <TextInput
        className="border-b border-border h-9 text-xl p-0 -mt-1  font-sourceSansProSemiBold"
        value={name}
        onChangeText={text => setName(text)}
      />
      <ConfirmButton onPress={saveHandler} disabled={!name} />
    </View>
  );
};

export default EditScreen;
