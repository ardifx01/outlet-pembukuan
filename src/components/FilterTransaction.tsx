import {Text, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {filter} from '../screens/HomeScreens/TransactionScreen';
import {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import colors from '../../assets/colors';
import MultipleCheckbox from './MultipleCheckbox';
import useFetch from '../hooks/useFetch';
import {Category} from '../global/types/category';

const FilterTransaction = ({
  filter,
  setFilter,
  showFilter,
  setShowFilter,
}: {
  filter: filter;
  setFilter: Dispatch<SetStateAction<filter>>;
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<filter['category']>(
    filter.category,
  );
  const [selectedType, setSelectedType] = useState<filter['type']>(filter.type);
  const close = () => {
    setShowFilter(false);
    setSelectedCategory(filter.category);
    setSelectedType(filter.type);
  };
  const {data} = useFetch<Category>({
    url: '/api/category/list',
    setRefreshing: () => {},
  });
  const typeOptions: RadioButtonProps[] = useMemo(
    () => [
      {
        id: 'all',
        label: 'Semua',
        color: colors.accent,
        size: 18,
        borderSize: 2,
      },
      {
        id: 'sale',
        label: 'Penjualan',
        color: colors.accent,
        size: 18,
        borderSize: 2,
      },
      {
        id: 'expense',
        label: 'Pengeluaran',
        color: colors.accent,
        size: 18,
        borderSize: 2,
      },
    ],
    [],
  );

  useEffect(() => {
    if (showFilter) {
      setSelectedCategory(filter.category);
      setSelectedType(filter.type);
    }
  }, [showFilter]);

  const reset = () => {
    setSelectedCategory([]);
    setSelectedType('all');
  };
  const save = () => {
    setShowFilter(false);
    setFilter({
      type: selectedType,
      category: selectedCategory,
    });
  };
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

        <View
          className={`px-5 py-2 ${
            selectedType != 'expense' ? 'border-b border-border' : 'pb-4'
          }`}>
          <Text className="text-base font-sourceSansProSemiBold text-secondary">
            JENIS
          </Text>
          <View className="py-1">
            <RadioGroup
              labelStyle={{
                color: colors.primary,
                fontFamily: 'SourceSansProSemiBold',
                fontSize: 16,
              }}
              containerStyle={{
                alignItems: 'flex-start',
                rowGap: -5,
              }}
              radioButtons={typeOptions}
              onPress={setSelectedType as (selectedId: string) => void}
              selectedId={selectedType}
            />
          </View>
        </View>
        {selectedType != 'expense' && (
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
        )}
      </View>
    </ReactNativeModal>
  );
};

export default FilterTransaction;
