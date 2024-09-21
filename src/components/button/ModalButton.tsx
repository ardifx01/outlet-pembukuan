import {JSXElementConstructor, ReactNode} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {IconCheck, TablerIcon} from 'tabler-icons-react-native';

const Btn = ({
  Icon,
  title,
  type,
  onPress,
}: {
  type: 'close' | 'ok';
  title: string;
  Icon?: TablerIcon;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center justify-center px-3 py-1 ${
      type == 'ok' ? 'bg-success' : 'bg-err'
    } rounded`}>
    <Text className="font-sourceSansProSemiBold text-white text-base">
      {title}
    </Text>
    {Icon && <Icon color={'#fff'} size={18} style={{marginRight: -3}} />}
  </TouchableOpacity>
);

export default Btn;
