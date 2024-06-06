import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {IconAdjustments, IconTrash, IconX} from 'tabler-icons-react-native';
import colors from '../../assets/colors';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const MultiSelectComponent = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const renderItem = (item: {label: string; value: string}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        mode="modal"
        // dropdownPosition="top"
        alwaysRenderSelectedItem
        style={styles.dropdown}
        placeholderStyle={{
          fontFamily: 'SourceSansProSemiBold',
          fontSize: 17,
          color: 'white',
        }}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemContainerStyle={{backgroundColor: 'white'}}
        containerStyle={{width: 200}}
        itemTextStyle={{color: 'red'}}
        activeColor={colors.border}
        data={data}
        iconColor={selected.length != 0 ? colors.primary : '#cacaca'}
        labelField="label"
        valueField="value"
        placeholder="Filters"
        value={selected}
        maxHeight={230}
        searchPlaceholder="Search..."
        onChange={item => {
          setSelected(item);
        }}
        renderRightIcon={() => {
          return <IconAdjustments color={'white'} size={20} />;
        }}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View className="flex-row justify-center items-center bg-border mt-2 mr-1 px-3 py-1 rounded-full">
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

export default MultiSelectComponent;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: colors.interaction,
    paddingHorizontal: 16,
    // paddingVertical: 4,
    width: 110,
    borderRadius: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'SourceSansPro',
    color: colors.primary,
  },
  iconStyle: {
    width: 28,
    height: 28,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
