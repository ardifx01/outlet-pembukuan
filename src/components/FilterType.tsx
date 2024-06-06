import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';

const FilterType = <T,>({
  types,
  type,
  setType,
  show,
  title,
}: {
  types: [string, string];
  title: [string, string];
  type: string | null;
  setType: Dispatch<SetStateAction<string | null>>;
  show: boolean;
}) => {
  const hiddenValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!show) {
      Animated.timing(hiddenValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(hiddenValue, {
        toValue: 35,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);
  return (
    <Animated.View
      style={{
        height: hiddenValue,
      }}
      className={`flex-row justify-around mx-4 bg-border ${
        show && 'mb-2'
      } rounded-full`}>
      <TouchableOpacity
        onPress={() => setType(null)}
        className={`${
          type == null && show && 'bg-interaction'
        } py-2 items-center rounded-full flex-auto`}>
        <Text
          className={`font-sourceSansProSemiBold ${
            !type ? 'text-white' : 'text-primary'
          }`}>
          Semua
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setType(types[0])}
        className={`${
          type == types[0] && show && 'bg-interaction'
        } py-2 items-center rounded-full flex-auto`}>
        <Text
          className={`font-sourceSansProSemiBold ${
            type == types[0] ? 'text-white' : 'text-primary'
          }`}>
          {title[0]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setType(types[1])}
        className={`${
          type == types[1] && show && 'bg-interaction'
        } py-2 items-center rounded-full flex-auto`}>
        <Text
          className={`font-sourceSansProSemiBold ${
            type == types[1] ? 'text-white' : 'text-primary'
          }`}>
          {title[1]}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FilterType;
