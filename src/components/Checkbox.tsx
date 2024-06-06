import CheckBox from '@react-native-community/checkbox';
import {useState} from 'react';
import colors from '../../assets/colors';

const SCheckbox = () => {
  const [checkbox, setCheckbox] = useState(false);
  return (
    <CheckBox
      style={{margin: -2}}
      value={checkbox}
      boxType="circle"
      onValueChange={value => setCheckbox(value)}
      tintColors={{true: colors.secondary, false: '#cacaca'}}
    />
  );
};
export default SCheckbox;
