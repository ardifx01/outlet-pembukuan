import {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavContext, navInitialContext} from '../../navigation/TabNavigation';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../../assets/colors';
import PopUpMenu, {PopUpMenuProps} from '../popup/PopUpMenu';

type cardCategoryProps = {
  name: string;
  onCheck?: () => void;
  checkValue: boolean;
  onUnCheck?: () => void;
};

const CardCategory = (props: cardCategoryProps & PopUpMenuProps) => {
  const {
    name,
    onCheck = () => {},
    onUnCheck = () => {},
    checkValue,
    ...menuProps
  } = props;
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
  };
  return (
    <TouchableOpacity
      onPress={select}
      disabled={!editMode}
      className={`flex flex-row px-5 py-4 justify-between items-center rounded-lg w-full border-b-[1px] border-border`}>
      <View className="flex flex-row items-center">
        {editMode && (
          <View className="-ml-2 -my-1">
            <CheckBox
              boxType="circle"
              value={checkbox}
              tintColors={{true: colors.secondary, false: colors.secondary}}
              onValueChange={value => {
                setCheckbox(value);
              }}
            />
          </View>
        )}
        <Text className="pl-2 font-sourceSansProSemiBold text-xl text-accent">
          {name}
        </Text>
      </View>
      <PopUpMenu {...menuProps} />
    </TouchableOpacity>
  );
};

export default CardCategory;
