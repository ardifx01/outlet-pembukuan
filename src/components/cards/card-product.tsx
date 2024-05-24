import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../assets/colors';
import CheckBox from '@react-native-community/checkbox';
import {useContext, useEffect, useState} from 'react';
import {NavContext, navInitialContext} from '../../context/NavigationContext';
import PopUpMenu, {PopUpMenuProps} from '../popup/PopUpMenu';

const CardProduct = ({
  id,
  name,
  category,
  basic_price,
  selling_price,
  onCheck = () => {},
  onUnCheck = () => {},
  checkValue,
  ...menuProps
}: {
  id: number;
  name: string;
  category: {name: string};
  basic_price: number;
  selling_price: number;
  onCheck?: () => void;
  checkValue: boolean;
  onUnCheck?: () => void;
} & PopUpMenuProps) => {
  const [checkbox, setCheckbox] = useState(false);
  const {editMode} = useContext(NavContext) as navInitialContext;
  useEffect(() => {
    setCheckbox(checkValue);
  }, [checkValue]);
  useEffect(() => {
    checkbox ? onCheck() : onUnCheck();
  }, [checkbox]);
  const select = () => {
    setCheckbox(checkbox => !checkbox);
    console.log(checkbox);
  };
  return (
    <TouchableOpacity
      disabled={!editMode}
      onPress={select}
      id="card-sale"
      className="flex flex-row justify-between pl-6 pr-3 py-1 mb-2 rounded-md border-b border-border">
      <View className="flex-row items-center">
        {editMode && (
          <View className="-ml-4 mr-2">
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
            {name}
          </Text>
          <Text className="font-sourceSansPro text-base text-accent">
            {category.name}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <View className="flex-col items-end text-base justify-end">
          <Text className="text-lg font-sourceSansProSemiBold text-accent">
            {selling_price.toLocaleString('ID-id', {
              minimumFractionDigits: 0,
              currency: 'IDR',
              style: 'currency',
            })}
          </Text>
          <Text className="text-base font-sourceSansProSemiBold text-err">
            {basic_price.toLocaleString('ID-id', {
              minimumFractionDigits: 0,
              currency: 'IDR',
              style: 'currency',
            })}
          </Text>
        </View>
        <PopUpMenu {...menuProps} />
      </View>
    </TouchableOpacity>
  );
};
export {CardProduct};
