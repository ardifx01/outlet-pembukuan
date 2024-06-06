import {Dispatch, SetStateAction, useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {
  TrxModalContext,
  TrxModalInitialContext,
} from '../../screens/HomeScreens/TransactionScreen';
import {IconChevronDown, IconChevronUp, IconX} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import CheckBox from '@react-native-community/checkbox';
import SCheckbox from '../Checkbox';
import ToggleButton from '../ToggleButton';
import DropdownComponent from '../DropdownElement';
import MultiSelectComponent from '../DropdownMultiple';

const FilterModal = () => {
  const {showFilterModal, setShowFilterModal} = useContext(
    TrxModalContext,
  ) as TrxModalInitialContext;
  const [toggle, setToggle] = useState(false);
  return (
    <ReactNativeModal
      isVisible={showFilterModal}
      backdropOpacity={0.2}
      animationOutTiming={400}
      animationInTiming={400}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}>
      <View className="bg-white max-h-[70%] min-h-[50%] w-[300px] self-center border-[#cacaca] border py-3">
        <View className="justify-between flex-row items-center mb-4 px-6">
          <Text className="text-primary text-xl font-sourceSansProSemiBold">
            Filter
          </Text>
          <View className="flex-row gap-x-2">
            <TouchableOpacity
              onPress={() => {
                setShowFilterModal(false);
              }}>
              <Text className="text-accent text-base">Bershikan</Text>
            </TouchableOpacity>
            <Text className="text-accent text-base">-</Text>
            <TouchableOpacity
              onPress={() => {
                setShowFilterModal(false);
              }}>
              <Text className="text-accent text-base">Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setToggle(toggle => !toggle)}
          className="flex-row border-b-[1px] px-2 mx-5 pb-2 border-[#cacaca] items-center justify-between ">
          <Text
            className={`text-lg font-sourceSansProSemiBold`}
            style={{color: toggle ? colors.shadow : '#b4b5b8'}}>
            Jenis
          </Text>
          <View className="mt-1">
            {toggle ? (
              <IconChevronUp color={toggle ? colors.shadow : '#b4b5b8'} />
            ) : (
              <IconChevronDown color={toggle ? colors.shadow : '#b4b5b8'} />
            )}
          </View>
        </TouchableOpacity>
        <View
          className="px-5 py-2 gap-y-1 bg-border"
          style={{display: toggle ? 'flex' : 'none'}}>
          <TouchableOpacity
            className="flex-row items-center"
            style={{columnGap: 5}}>
            {!toggle || <SCheckbox />}
            <Text className="-ml-1 font-sourceSansProSemiBold text-shadow text-base">
              Penjualan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            style={{columnGap: 5}}>
            {!toggle || <SCheckbox />}
            <Text className="-ml-1 font-sourceSansProSemiBold text-shadow text-base">
              Pengeluaran
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};
export default FilterModal;
