import {Text, TextInput, View} from 'react-native';
import ToggleButton from '../../ToggleButton';
import {useContext, useState} from 'react';
import Button from '../../button/Button';
import {IconCheck, IconX} from 'tabler-icons-react-native';
import colors from '../../../../assets/colors';
import {
  TrxModalContext,
  TrxModalInitialContext,
} from '../../../screens/HomeScreens/TransactionScreen';

const ExpenseForm = () => {
  const [toggle, setToggle] = useState(false);
  const {setShowModal} = useContext(TrxModalContext) as TrxModalInitialContext;
  return (
    <View className="flex-1 justify-between pb-3">
      <View>
        <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
          Nama Pengeluaran
        </Text>
        <TextInput className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base" />
        <Text className="font-sourceSansProSemiBold text-base mt-3 pl-2 text-accent mr-4">
          Total
        </Text>
        <TextInput
          inputMode="numeric"
          className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
        />

        <View className="mt-3 flex-row flex items-center">
          <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent mr-4">
            Utang
          </Text>
          <ToggleButton {...{setToggle, toggle}} />
        </View>
        {toggle && (
          <View className="p-2 border-placeholder/40 border-dashed border-2 mt-3 ">
            <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent mr-4">
              Catatan
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              style={{textAlignVertical: 'top'}}
              className="bg-border px-3 rounded-md text-accent font-sourceSansProSemiBold text-base"
            />
            <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent mr-4">
              Total
            </Text>
            <TextInput
              inputMode="numeric"
              className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
            />
          </View>
        )}
      </View>
      <View className="flex flex-row justify-around mt-3 w-full">
        <Button
          icon={<IconX size={20} color={colors.primary} />}
          onPress={() => {
            setShowModal(false);
          }}
          classname="bg-border w-[45%]"
          textColor={colors.primary}>
          Batalkan
        </Button>
        <Button
          icon={<IconCheck size={20} color={'white'} />}
          onPress={() => {}}
          classname="bg-accent w-[45%]"
          textColor={'white'}>
          Tambahkan
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;
