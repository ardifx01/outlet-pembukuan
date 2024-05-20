import {Alert} from 'react-native';

const sessionExp = () => {
  return Alert.alert('Sesi Habis', 'Silahkan login kembali', [
    {text: 'Ok', style: 'destructive', onPress: () => {}},
  ]);
};

export default sessionExp;
