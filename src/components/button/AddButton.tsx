import {View, Text, Animated, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import {IconPlus} from 'tabler-icons-react-native';
import {NavContext, navInitialContext} from '../../navigation/TabNavigation';

const AddButton = ({onPress = () => {}}) => {
  const {navHide} = useContext(NavContext) as navInitialContext;
  const hiddenValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (navHide) {
      Animated.timing(hiddenValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(hiddenValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [navHide]);
  return (
    <Animated.View
      style={{transform: [{scale: hiddenValue}]}}
      className={'absolute bottom-28 right-5 z-50'}>
      <TouchableOpacity
        onPress={onPress}
        className="bg-accent p-4 rounded-full items-center">
        <IconPlus size={30} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AddButton;
