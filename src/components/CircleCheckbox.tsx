import {TouchableOpacity} from 'react-native';
import {IconCircle, IconCircleCheckFilled} from 'tabler-icons-react-native';
import colors from '../../assets/colors';
import {useEffect, useState} from 'react';

const CircleCheckbox = ({
  onCheck,
  onUnCheck,
  checked,
}: {
  onCheck: () => void;
  onUnCheck: () => void;
  checked: boolean;
}) => {
  const [checkbox, setCheckbox] = useState(checked);
  useEffect(() => {
    if (checkbox) {
      onCheck();
    } else {
      onUnCheck();
    }
  }, [checkbox]);
  useEffect(() => {
    setCheckbox(checked);
  }, [checked]);
  return (
    <TouchableOpacity onPress={() => setCheckbox(checkbox => !checkbox)}>
      {checkbox ? (
        <IconCircleCheckFilled color={colors.accent} stroke={0} size={22} />
      ) : (
        <IconCircle color={colors.accent} size={22} />
      )}
    </TouchableOpacity>
  );
};

export default CircleCheckbox;
