import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../assets/colors';
import CheckBox from '@react-native-community/checkbox';
import {useContext, useEffect, useState} from 'react';
import {NavContext, navInitialContext} from '../../navigation/TabNavigation';
import PopUpMenu, {PopUpMenuProps} from '../popup/PopUpMenu';
import currency from '../../lib/currency';

const CardReceivable = ({
  id,
  note,
  category,
  total,
  paid,
  created_at,
  onCheck = () => {},
  onUnCheck = () => {},
  checkValue,
  onPress,
  ...menuProps
}: {
  id: number;
  note: string;
  category: string;
  total: number;
  paid: boolean;
  created_at: string;
  onCheck?: (id: number) => void;
  checkValue: boolean;
  onUnCheck?: (id: number) => void;
  onPress?: () => void;
} & PopUpMenuProps) => {
  const [checkbox, setCheckbox] = useState(false);
  const {editMode} = useContext(NavContext) as navInitialContext;
  useEffect(() => {
    setCheckbox(checkValue);
  }, [checkValue]);

  useEffect(() => {
    checkbox ? onCheck(id) : onUnCheck(id);
  }, [checkbox]);
  const select = () => {
    setCheckbox(checkbox => !checkbox);
  };

  return (
    <TouchableOpacity
      onPress={editMode ? select : onPress}
      key={id}
      id="card-sale"
      className="flex flex-row justify-between pl-6 pr-3 py-1 mb-2 rounded-md border-b border-border">
      <View className="flex-row items-center">
        {editMode && (
          <View className="-ml-4 mr-1">
            <CheckBox
              value={checkbox}
              tintColors={{true: colors.secondary, false: colors.secondary}}
              onValueChange={value => {
                setCheckbox(value);
              }}
            />
          </View>
        )}
        <View>
          <Text className="font-sourceSansProSemiBold text-lg text-primary">
            {note.substring(0, 13)}
            {note.length > 13 && '....'}
          </Text>
          {category && (
            <Text className="font-sourceSansPro text-base text-accent">
              {category}
            </Text>
          )}
        </View>
      </View>
      <View className="flex-row items-center">
        <View>
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
              {currency(total, true)}
            </Text>
          </View>
        </View>
        <PopUpMenu {...menuProps} />
      </View>
    </TouchableOpacity>
  );
};
export {CardReceivable};
