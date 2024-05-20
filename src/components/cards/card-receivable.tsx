import {Text, TouchableOpacity, View} from 'react-native';
import {
  IconDotsCircleHorizontal,
  IconDotsVertical,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import CheckBox from '@react-native-community/checkbox';
import {useContext, useEffect, useState} from 'react';
import {NavContext, navInitialContext} from '../../context/NavigationContext';

const CardReceivable = ({
  id,
  note,
  category,
  total,
  paid,
  created_at,
  onCheck,
  onUnCheck,
  checkValue,
}: {
  id: number;
  note: string;
  category: string;
  total: number;
  paid: boolean;
  created_at: string;
  onCheck?: () => void;
  checkValue: boolean;
  onUnCheck?: () => void;
}) => {
  const [checkbox, setCheckbox] = useState(false);
  const {editMode} = useContext(NavContext) as navInitialContext;
  useEffect(() => {
    setCheckbox(checkValue);
  }, [checkValue]);

  return (
    <View key={id} id="card-sale">
      <Menu>
        <MenuTrigger
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            paddingVertical: 5,
            paddingHorizontal: 24,
            borderBottomWidth: 3,
            borderBottomColor: colors.border,
          }}>
          <View className="flex-row items-center">
            {editMode && (
              <View className="-ml-4 mr-1">
                <CheckBox
                  value={checkbox}
                  tintColors={{true: colors.secondary, false: colors.secondary}}
                  onValueChange={value => {
                    setCheckbox(value);
                    value ? onCheck : onUnCheck;
                  }}
                />
              </View>
            )}
            <View>
              <Text className="font-sourceSansProSemiBold text-lg text-primary">
                {note}
              </Text>
              <Text className="font-sourceSansPro text-base text-accent">
                {category}
              </Text>
            </View>
          </View>
          <View className="flex">
            <Text className="font-sourceSansProSemiBold text-base text-primary self-end">
              {created_at}
            </Text>
            <View className="self-end flex flex-row text-base pt-1">
              <Text
                className="text-base text-emerald-500 font-sourceSansProSemiBold"
                style={{
                  color: paid ? colors.success : colors.err,
                }}>
                {paid ? 'Lunas' : 'Belum lunas'}
                {' :  '}
              </Text>
              <Text
                className="text-base font-sourceSansProSemiBold"
                style={{
                  color: paid ? colors.success : colors.err,
                }}>
                {total.toLocaleString('ID-id', {
                  minimumFractionDigits: 0,
                  currency: 'IDR',
                  style: 'currency',
                })}
              </Text>
            </View>
          </View>
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsWrapper: {
              position: 'absolute',
              right: '-50%',
              backgroundColor: '#f7f7f7',
              width: 120,
              display: 'flex',
              paddingVertical: 5,
            },
          }}>
          <MenuOption>
            <Text className="font-sourceSansPro text-lg text-gray-600 px-2">
              Detail
            </Text>
          </MenuOption>
          <MenuOption>
            <Text className="font-sourceSansPro text-lg text-gray-600 px-2">
              Edit
            </Text>
          </MenuOption>
          <MenuOption>
            <Text className="font-sourceSansPro text-lg text-gray-600 px-2">
              Delete
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};
export {CardReceivable};
