import {Text, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {filter} from '../screens/HomeScreens/TransactionScreen';
import {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import colors from '../../assets/colors';
import MultipleCheckbox from './MultipleCheckbox';
import useFetch from '../hooks/useFetch';
import {Category} from '../global/types/category';

const FilterProduct = ({
  filter,
  setFilter,
  showFilter,
  setShowFilter,
}: {
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>(filter);
  const close = () => {
    setShowFilter(false);
    setSelectedCategory(filter);
  };
  const {data} = useFetch<Category>({
    url: '/api/category/list',
    setRefreshing: () => {},
  });

  const reset = () => {
    setSelectedCategory([]);
  };
  const save = () => {
    setShowFilter(false);
    setFilter(selectedCategory);
  };

  useEffect(() => {
    if (showFilter) setSelectedCategory(filter);
  }, [showFilter]);

  return (
    <ReactNativeModal
      isVisible={showFilter}
      onBackdropPress={close}
      onBackButtonPress={close}
      className="justify-center w-[75%] m-auto">
      <View className="bg-white rounded-lg">
        <View className="flex-row items-center px-5 py-5 justify-between border-b border-border pb-4">
          <Text className="text-primary font-sourceSansProSemiBold text-xl">
            Filter
          </Text>
          <View className="flex-row items-center gap-x-3">
            <TouchableOpacity
              onPress={reset}
              className="bg-err justify-center px-3 py-1 rounded">
              <Text className="text-white font-sourceSansPro">Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={save}
              className="bg-primary justify-center px-3 py-1 rounded">
              <Text className="text-white font-sourceSansPro">Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 py-2 pb-5">
          <Text className="text-base font-sourceSansProSemiBold text-secondary">
            KATEGORI
          </Text>
          <View className="py-1 px-4">
            {data && (
              <MultipleCheckbox
                {...{
                  data: data.map(({id, name}) => ({id: name, label: name})),
                  selected: selectedCategory,
                  setSelected: setSelectedCategory,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default FilterProduct;
