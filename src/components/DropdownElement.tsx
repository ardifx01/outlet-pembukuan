import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../../assets/colors';
import {IconChevronDown} from 'tabler-icons-react-native';
import {Suggestions} from './modal/transaction-modal/sale-form';

const DropdownComponent = ({
  data,
  setValue,
  value,
}: {
  data: Suggestions[];
  setValue: Dispatch<SetStateAction<string | null>> | any;
  value: string | null;
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      mode="modal"
      style={[styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      itemContainerStyle={styles.itemContainerStyle}
      itemTextStyle={styles.itemsTextStyle}
      iconStyle={styles.iconStyle}
      iconColor={colors.secondary}
      containerStyle={styles.containerStyle}
      data={data}
      search
      maxHeight={200}
      labelField="title"
      valueField="title"
      value={value}
      placeholder={'Pilih Kategori'}
      searchPlaceholder="Search..."
      showsVerticalScrollIndicator={false}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.title);
        setIsFocus(false);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.border,
    borderRadius: 12,
    elevation: 20,
    shadowColor: 'gray',
  },
  dropdown: {
    borderRadius: 8,
    backgroundColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'SourceSansProSemiBold',
    color: colors.secondary,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'SourceSansProSemiBold',
    color: colors.primary,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: colors.border,
  },
  itemContainerStyle: {
    backgroundColor: colors.border,
    borderBottomColor: 'gray',
    marginBottom: 1,
    elevation: 20,
    shadowColor: 'gray',
  },
  itemsTextStyle: {
    color: colors.primary,
    fontFamily: 'SourceSansProSemiBold',
  },
});
