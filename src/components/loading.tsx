import {
  ActivityIndicator,
  ActivityIndicatorComponent,
  Easing,
  Text,
  View,
} from 'react-native';
import colors from '../../assets/colors';
const Loading = () => {
  return (
    <>
      <View className="justify-center px-8 items-center absolute flex z-[60] top-0 left-0 bottom-0 right-0 bg-black/25">
        <View className="relative w-auto my-6 mx-auto max-w-3xl">
          <View className="bg-white p-6 rounded-md">
            <ActivityIndicator size={'large'} color={colors.secondary} />
          </View>
        </View>
      </View>
    </>
  );
};

export default Loading;
