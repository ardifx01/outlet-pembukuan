import CheckBox from '@react-native-community/checkbox';
import {useState} from 'react';
import colors from '../../assets/colors';

const SCheckbox = () => {
  const [checkbox, setCheckbox] = useState(false);
  return (
    <CheckBox
      style={{margin: -2}}
      boxType="circle"
      value={checkbox}
      onValueChange={value => setCheckbox(value)}
      tintColors={{true: colors.accent, false: colors.accent}}
    />
  );
};
export default SCheckbox;
