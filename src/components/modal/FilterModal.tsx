import {Dispatch, SetStateAction, useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {
  TrxModalContext,
  TrxModalInitialContext,
} from '../../screens/HomeScreens/TransactionScreen';
import {IconX} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import CheckBox from '@react-native-community/checkbox';
import SCheckbox from '../Checkbox';

const FilterModal = () => {
  const {showFilterModal, setShowFilterModal} = useContext(
    TrxModalContext,
  ) as TrxModalInitialContext;
  return (
    <ReactNativeModal
      isVisible={showFilterModal}
      backdropOpacity={0.2}
      animationOutTiming={400}
      animationInTiming={400}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}>
      <View className="bg-slate-100 h-[60%] w-[270px] self-center rounded-lg py-3">
        <View className="justify-between flex-row items-center mb-2 px-4">
          <Text className="text-primary text-xl font-sourceSansProSemiBold">
            Filter
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowFilterModal(false);
            }}>
            <IconX size={25} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text className="text-lg text-shadow border-b-[1px] font-sourceSansProSemiBold px-2 mx-2 pb-1 border-secondary">
          Jenis
        </Text>
        <View className="px-4 mt-2 mb-3 flex" style={{rowGap: 4}}>
          <TouchableOpacity
            className="flex-row items-center"
            style={{columnGap: 5}}>
            <SCheckbox />
            <Text className="font-sourceSansProSemiBold text-accent text-base">
              Penjualan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            style={{columnGap: 5}}>
            <SCheckbox />
            <Text className="font-sourceSansProSemiBold text-accent text-base">
              Pengeluaran
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-lg text-shadow border-b-[1px] font-sourceSansProSemiBold px-2 mx-2 pb-1 border-secondary">
          Kategori
        </Text>
        <View className="px-4 mt-2 mb-3 flex" style={{rowGap: 4}}>
          <TouchableOpacity
            className="flex-row items-center"
            style={{columnGap: 5}}>
            <SCheckbox />
            <Text className="font-sourceSansProSemiBold text-accent text-base">
              Pulsa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            style={{columnGap: 5}}>
            <SCheckbox />
            <Text className="font-sourceSansProSemiBold text-accent text-base">
              Kartu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            style={{columnGap: 5}}>
            <SCheckbox />
            <Text className="font-sourceSansProSemiBold text-accent text-base">
              Voucher
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            style={{columnGap: 5}}>
            <SCheckbox />
            <Text className="font-sourceSansProSemiBold text-accent text-base">
              Kabel data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            style={{columnGap: 5}}>
            <SCheckbox />
            <Text className="font-sourceSansProSemiBold text-accent text-base">
              Listrik
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};
export default FilterModal;
