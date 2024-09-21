import React, {
  Dispatch,
  ForwardedRef,
  forwardRef,
  LegacyRef,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {IMultiSelectRef, MultiSelect} from 'react-native-element-dropdown';
import {IconAdjustments, IconTrash, IconX} from 'tabler-icons-react-native';
import colors from '../../assets/colors';

const MultiSelectComponent = (
  {
    data,
    selected,
    setSelected,
  }: {
    data: {label: string; value: string}[];
    selected: string[];
    setSelected: Dispatch<SetStateAction<string[]>>;
  },
  ref: ForwardedRef<IMultiSelectRef>,
) => {
  const renderItem = (item: {label: string; value: string}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View>
      <MultiSelect
        ref={ref as RefObject<IMultiSelectRef>}
        mode="modal"
        // dropdownPosition="top"
        inside
        alwaysRenderSelectedItem
        style={{
          paddingHorizontal: 20,
          height: selected.length == 0 ? 0 : 'auto',
          paddingTop: 4,
        }}
        selectedTextStyle={styles.selectedTextStyle}
        itemContainerStyle={{backgroundColor: 'white'}}
        containerStyle={{width: 200}}
        itemTextStyle={{color: 'red'}}
        activeColor={colors.border}
        data={data}
        iconColor={selected.length != 0 ? colors.primary : '#cacaca'}
        labelField="label"
        valueField="value"
        placeholder=""
        value={selected}
        maxHeight={230}
        searchPlaceholder="Search..."
        onChange={item => {
          setSelected(item);
        }}
        renderRightIcon={() => {
          return <></>;
        }}
        renderItem={renderItem}
        visibleSelectedItem
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity
            // className="absolute -top-[70px]"
            onPress={() => unSelect && unSelect(item)}>
            <View className="flex-row justify-center items-center bg-border mt-2 mr-1 pl-4 pr-3 py-1 rounded-full">
              <Text className="font-sourceSansPro text-base text-accent">
                {item.label}
              </Text>
              <IconX color={colors.err} size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const MultiSelectForwardRef = forwardRef(MultiSelectComponent);
export default MultiSelectForwardRef;

const styles = StyleSheet.create({
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'SourceSansPro',
    color: colors.primary,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
