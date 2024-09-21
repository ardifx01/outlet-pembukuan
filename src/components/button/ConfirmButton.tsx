import {Text, TouchableOpacity} from 'react-native';

const ConfirmButton = ({
  onPress,
  disabled,
}: {
  onPress: () => void;
  disabled: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`mt-5 py-2 rounded-full ${
        disabled ? 'bg-interaction/50' : 'bg-interaction'
      }`}>
      <Text className="mx-auto text-white font-sourceSansProSemiBold text-lg">
        Simpan
      </Text>
    </TouchableOpacity>
  );
};

export default ConfirmButton;
