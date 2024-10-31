import {Dispatch, SetStateAction, useEffect} from 'react';
import {Text, View} from 'react-native';

import Each from './Each';
import CircleCheckbox from './CircleCheckbox';

type field = Array<{
  id: string;
  label: string;
}>;
type MultipleCheckboxProps = {
  data: field;
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
};

const MultipleCheckbox = ({
  data,
  selected,
  setSelected,
}: MultipleCheckboxProps) => {
  return (
    <View>
      <Each
        of={data}
        render={({id, label}) => (
          <View className="flex-row gap-x-2 items-center mt-1">
            <CircleCheckbox
              onCheck={() => {
                setSelected(selected => [...selected, id]);
              }}
              onUnCheck={() => {
                setSelected(selected => selected.filter(val => val != label));
              }}
              checked={selected.includes(label)}
            />
            <Text className="text-primary font-sourceSansProSemiBold text-base">
              {label}
            </Text>
          </View>
        )}
        ifNull={<></>}
      />
    </View>
  );
};
export default MultipleCheckbox;
