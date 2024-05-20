import {TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {IconDotsVertical} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {Text} from 'react-native';

export type PopUpMenuProps = {
  onEdit?: () => void;
  onDetail?: () => void;
  onDelete?: () => void;
};

const PopUpMenu = ({onEdit, onDelete, onDetail}: PopUpMenuProps) => {
  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
        }}
        style={{
          marginRight: -4,
          marginLeft: 4,
        }}>
        <IconDotsVertical size={20} color={colors.secondary} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsWrapper: {
            position: 'absolute',
            right: 20,
            backgroundColor: colors.border,
            width: 120,
            display: 'flex',
            paddingVertical: 5,
          },
        }}>
        <MenuOption onSelect={onDetail}>
          <Text className="font-sourceSansPro text-lg text-primary px-2">
            Detail
          </Text>
        </MenuOption>
        <MenuOption onSelect={onEdit}>
          <Text className="font-sourceSansPro text-lg text-primary px-2">
            Edit
          </Text>
        </MenuOption>
        <MenuOption onSelect={onDelete}>
          <Text className="font-sourceSansPro text-lg text-primary px-2">
            Delete
          </Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default PopUpMenu;
