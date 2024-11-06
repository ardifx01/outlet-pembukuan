import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/colors';
import {formatNumber} from '../lib/currency';

const DotChart = ({
  x,
  y,
  indexData,
}: {
  x: number;
  y: number;
  index: number;
  indexData: number;
}) => {
  const [dotSize, setDotSize] = useState({w: 0, h: 0});
  return (
    <View
      onLayout={({nativeEvent}) => {
        setDotSize({
          w: nativeEvent.layout.width,
          h: nativeEvent.layout.height,
        });
      }}
      style={{
        position: 'absolute',
        top: y,
        left: x,
        backgroundColor: colors.interaction,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        transform: [
          {translateX: -1 * (dotSize.w / 2)},
          {translateY: -1 * (dotSize.h / 2)},
          {rotate: '90deg'},
          {translateX: dotSize.w / 2},
          {translateY: -dotSize.h / 2},
        ],
        display: 'flex',
        zIndex: 99999,
      }}>
      <Text className="font-sourceSansProSemiBold, text-white">
        {formatNumber(indexData)}
      </Text>
    </View>
  );
};

export default DotChart;
