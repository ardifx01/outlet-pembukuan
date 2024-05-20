import React, {ReactNode} from 'react';
import {Text, TouchableOpacity} from 'react-native';
type myBtn = {
  onPress: () => void;
  classname: string;
  children: ReactNode;
  textColor: string;
  icon?: ReactNode;
};
const Button = ({
  onPress = () => {},
  classname,
  children,
  textColor = '#000',
  icon,
}: myBtn) => {
  return (
    <TouchableOpacity
      className={`py-3 px-6 rounded-full ${classname}`}
      style={{
        columnGap: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      {icon && icon}
      <Text style={{color: textColor}} className="font-sourceSansProSemiBold">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
