import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import Each from './Each';

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a === 'string' && typeof b === 'string') return a === b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (
    typeof a === 'object' &&
    typeof b === 'object' &&
    a !== null &&
    b !== null
  ) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (const key of aKeys) {
      if (!b.hasOwnProperty(key) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }

  return false;
}

const FilterType = <T,>({
  types,
  type,
  setType,
  show,
  title,
  defaultTitle = 'Semua',
}: {
  defaultTitle?: string;
  types: T[];
  title: string[];
  type: T | null;
  setType: (date: T | null) => void | Dispatch<SetStateAction<T | null>>;
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
        disabled={!show}
        onPress={() => setType(null)}
        className={`${
          type == null && show && 'bg-interaction'
        } py-2 items-center rounded-full flex-auto`}>
        <Text
          className={`font-sourceSansProSemiBold ${
            !type ? 'text-white' : 'text-primary'
          }`}>
          {defaultTitle}
        </Text>
      </TouchableOpacity>
      <Each
        of={types}
        render={(item, index) => (
          <TouchableOpacity
            key={index}
            disabled={!show}
            onPress={() => setType(item)}
            className={`${
              deepEqual(type, item) && show && 'bg-interaction'
            } py-2 items-center rounded-full flex-auto`}>
            <Text
              className={`font-sourceSansProSemiBold ${
                deepEqual(type, item) ? 'text-white' : 'text-primary'
              }`}>
              {title[index]}
            </Text>
          </TouchableOpacity>
        )}
        ifNull={<></>}
      />
    </Animated.View>
  );
};

export default FilterType;
