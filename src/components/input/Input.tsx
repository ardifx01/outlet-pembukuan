import {useState} from 'react';
import {StyleProp, TextInput, TextInputProps, TextStyle} from 'react-native';

const Input = ({
  onFocusStyle,
  style,
  ...props
}: {
  onFocusStyle?: StyleProp<TextStyle>;
} & TextInputProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <TextInput
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={[style, focus && onFocusStyle]}
      {...props}></TextInput>
  );
};

export default Input;
