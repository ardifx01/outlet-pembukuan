import {Alert} from 'react-native';

export default function (
  title: string,
  message: string,
  onPressOk?: () => void | Promise<void>,
  behavior: 'Hapus' | 'Simpan' = 'Simpan',
  onCancel?: () => void | Promise<void>,
) {
  return Alert.alert(title, message, [
    {
      text: 'Batal',
      style: 'cancel',
      onPress: onCancel,
    },
    {
      text: behavior,
      style: 'default',
      onPress: onPressOk,
    },
  ]);
}
