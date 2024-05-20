import CheckBox from '@react-native-community/checkbox';
import {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import colors from '../../../assets/colors';
import {NavContext, navInitialContext} from '../../context/NavigationContext';

const CardSale = ({
  id,
  name,
  category,
  created_at,
  basic_price,
  selling_price,
  onCheck,
  onUnCheck,
  checkValue,
}: {
  id: number;
  name: string;
  category: string;
  created_at: string;
  basic_price: number;
  selling_price: number;
  onCheck?: () => void;
  onUnCheck?: () => void;
  checkValue: boolean;
}) => {
  const [checkbox, setCheckbox] = useState(false);
  const {editMode} = useContext(NavContext) as navInitialContext;
  useEffect(() => {
    setCheckbox(checkValue);
  }, [checkValue]);

  return (
    <View
      key={id}
      id="card-sale"
      className="flex flex-row justify-between px-4 py-1 bg-blue-100 mb-2 rounded-md mx-2">
      <View className="flex-row items-center">
        {editMode && (
          <View className="-ml-3">
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
          <Text className="font-sourceSansProSemiBold text-base text-primary">
            {name}
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
        <View className="self-end flex flex-row text-base">
          <Text className="text-base font-sourceSansProSemiBold text-secondary">
            {selling_price}
            {' - '}
          </Text>
          <Text className="text-base font-sourceSansProSemiBold text-err">
            {basic_price}
            {' = '}
          </Text>
          <Text className="text-base font-sourceSansProSemiBold text-emerald-600">
            {selling_price - basic_price}
          </Text>
        </View>
      </View>
    </View>
  );
};

const CardExpense = ({
  id,
  name,
  total,
  created_at,
  onCheck,
  onUnCheck,
  checkValue,
}: {
  id: number;
  name: string;
  total: number;
  created_at: string;
  onCheck?: () => void;
  onUnCheck?: () => void;
  checkValue: boolean;
}) => {
  const [checkbox, setCheckbox] = useState(checkValue);
  const {editMode} = useContext(NavContext) as navInitialContext;

  useEffect(() => {
    setCheckbox(checkValue);
  }, [checkValue]);
  return (
    <View
      id="card-expense"
      className="flex flex-row justify-between px-4 py-1 bg-red-100 mb-2 mx-2 rounded-md">
      <View>
        <View className="flex-row items-center">
          {editMode && (
            <View className="-ml-3">
              <CheckBox
                tintColors={{true: colors.secondary, false: colors.secondary}}
                value={checkbox}
                onValueChange={value => {
                  setCheckbox(value);
                  value ? onCheck : onUnCheck;
                }}
              />
            </View>
          )}
          <View>
            <Text className="font-sourceSansProSemiBold text-base text-primary">
              {name}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex">
        <Text className="font-sourceSansProSemiBold text-base text-primary self-end">
          {created_at}
        </Text>
        <View className="self-end flex flex-row text-base">
          <Text className="text-base font-sourceSansProSemiBold text-err">
            {' - '}
            {total}
          </Text>
        </View>
      </View>
    </View>
  );
};
export {CardSale, CardExpense};
