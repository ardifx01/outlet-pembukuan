import CheckBox from '@react-native-community/checkbox';
import {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../assets/colors';
import {NavContext, navInitialContext} from '../../navigation/TabNavigation';
import currency from '../../lib/currency';
import PopUpMenu, {PopUpMenuProps} from '../popup/PopUpMenu';
import {IconBrandCashapp} from 'tabler-icons-react-native';

import {timeFormat} from '../../lib/time';

const CardSale = ({
  id,
  name,
  category,
  created_at,
  basic_price,
  selling_price,
  onCheck = () => {},
  onUnCheck = () => {},
  checkValue,
  receivable,
  onPress,
  ...popMenu
}: {
  id: number;
  name: string;
  category: string;
  created_at: number;
  basic_price: number;
  selling_price: number;
  receivable?: {
    total: number;
    note: string;
    paid: boolean;
  };
  onCheck?: (id: number) => void;
  onUnCheck?: (id: number) => void;
  onPress?: () => void;
  checkValue: boolean;
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

  const timeStamp = timeFormat(created_at);

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={editMode ? select : onPress}
      id="card-sale"
      className="flex flex-row justify-between pl-4 pr-2 py-1 bg-blue-100 mb-1 rounded-md mx-2">
      <View className="flex-row items-center">
        {editMode && (
          <View className="-ml-3">
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
          <Text className="font-sourceSansProSemiBold text-base text-primary">
            {name}
          </Text>
          <Text className="font-sourceSansPro text-base text-accent">
            {category}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <View className="flex">
          <Text className="font-sourceSansProSemiBold text-base text-primary self-end">
            {timeStamp}
          </Text>
          <View className="self-end flex flex-row text-base items-center">
            {receivable && (
              <IconBrandCashapp
                color={receivable.paid ? colors.success : colors.err}
                size={20}
              />
            )}
            <Text className="text-base font-sourceSansProSemiBold text-secondary">
              {currency(selling_price)}
            </Text>
            <Text className="text-base font-sourceSansProSemiBold text-err">
              {' - '}
              {currency(basic_price)}
            </Text>
            <Text className="text-base font-sourceSansProSemiBold text-emerald-600">
              {' = '}
              {currency(selling_price - basic_price)}
            </Text>
          </View>
        </View>
        <PopUpMenu {...popMenu} />
      </View>
    </TouchableOpacity>
  );
};

const CardExpense = ({
  id,
  name,
  total,
  created_at,
  onCheck = () => {},
  onUnCheck = () => {},
  checkValue,
  debt,
  onPress,
  ...popMenu
}: {
  id: number;
  name: string;
  total: number;
  created_at: number;
  debt?: {
    note: string;
    total: number;
    paid: boolean;
  };
  onCheck?: (id: number) => void;
  onUnCheck?: (id: number) => void;
  onPress?: () => void;
  checkValue: boolean;
} & PopUpMenuProps) => {
  const [checkbox, setCheckbox] = useState(checkValue);
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

  const timeStamp = timeFormat(created_at);

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={editMode ? select : onPress}
      id="card-expense"
      className="flex flex-row justify-between pl-4 pr-2 py-1 bg-red-100 mb-1 mx-2 rounded-md">
      <View>
        <View className="flex-row items-center">
          {editMode && (
            <View className="-ml-3">
              <CheckBox
                tintColors={{true: colors.secondary, false: colors.secondary}}
                value={checkbox}
                onValueChange={value => {
                  setCheckbox(value);
                }}
              />
            </View>
          )}
          <View>
            <Text className="font-sourceSansProSemiBold text-base text-primary">
              {name}
            </Text>
            <Text className="text-base font-sourceSansPro text-err">
              Pengeluaran
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row items-center">
        <View className="flex">
          <Text className="font-sourceSansProSemiBold text-base text-primary self-end">
            {timeStamp}
          </Text>
          <View className="self-end flex flex-row items-center">
            {debt && (
              <IconBrandCashapp
                color={debt.paid ? colors.success : colors.err}
                size={20}
              />
            )}
            <Text className="text-base font-sourceSansProSemiBold text-err">
              {' - '}
              {currency(total)}
            </Text>
          </View>
        </View>
        <PopUpMenu {...popMenu} />
      </View>
    </TouchableOpacity>
  );
};
export {CardSale, CardExpense};
