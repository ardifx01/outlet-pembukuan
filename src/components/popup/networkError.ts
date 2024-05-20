import {Alert} from 'react-native';

const networkError = () => {
  return Alert.alert('Error', 'Jaringan Error', [
    {text: 'Ok', style: 'destructive', onPress: () => {}},
  ]);
};

export default networkError;
