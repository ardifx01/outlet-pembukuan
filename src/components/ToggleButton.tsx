import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Animated} from 'react-native';
import colors from '../../assets/colors';

const ToggleButton = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}) => {
  const moveValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!toggle) {
      Animated.timing(moveValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(moveValue, {
        toValue: 16,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [toggle]);
  return (
    <TouchableOpacity
      onPress={() => setToggle(!toggle)}
      className={`w-8 h-3 rounded-full flex justify-center ${
        toggle ? 'bg-border' : 'bg-gray-200'
      }`}>
      <Animated.View
        className="w-[18px] h-[18px] rounded-full"
        style={{
          transform: [{translateX: moveValue}],
          backgroundColor: toggle ? colors.accent : '#a6a6a6',
        }}></Animated.View>
    </TouchableOpacity>
  );
};

export default ToggleButton;
