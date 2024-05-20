import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ButtonOpt = ({
  onPress,
  active,
  children,
}: {
  onPress: any;
  active: boolean;
  children: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        active
          ? 'px-6 py-[6.5] bg-interaction rounded-full'
          : 'bg-accent py-[2.5] px-[2.5] rounded-full'
      }`}>
      <Text
        className={`${
          active ? 'text-white' : 'bg-white rounded-full px-5 py-1 text-accent'
        } font-sourceSansProSemiBold`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonOpt;
