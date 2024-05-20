import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonOpt from '../../components/button/ButtonOption';
import {
  IconAdjustments,
  IconSearch,
  IconTrash,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {CardReceivable} from '../../components/cards/card-receivable';
import AddButton from '../../components/button/AddButton';
import {createContext, useContext, useState} from 'react';
import ReceivableModal from '../../components/modal/ReceivableModal';
import isCloseToBottom from '../../lib/navigation';
import {NavContext, navInitialContext} from '../../context/NavigationContext';
import CheckBox from '@react-native-community/checkbox';

const Receivable = () => {
  const [showModal, setShowModal] = useState(false);
  const {setNavHide, editMode} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);

  const modalToggle = () => {
    setShowModal(true);
  };
  return (
    <View className="h-full bg-white">
      <AddButton onPress={modalToggle} />
      <View className="flex flex-row pl-4 pr-5 py-5 bg-white justify-between">
        <View className="flex flex-row justify-between flex-1 mr-5">
          <ButtonOpt active={true} onPress={() => {}}>
            Hari ini
          </ButtonOpt>
          <ButtonOpt active={false} onPress={() => {}}>
            Minggu ini
          </ButtonOpt>
          <ButtonOpt active={false} onPress={() => {}}>
            Bulan ini
          </ButtonOpt>
        </View>
        <TouchableOpacity>
          <IconAdjustments size={30} color={colors.accent} />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between">
        <View className="ml-6 border-b-[1px] flex-row flex mt-1 pb-[5px] w-2/5 border-accent">
          <IconSearch size={23} color={colors.accent} />
          <TextInput
            className="p-0 mx-1 h-6 text-[15px]"
            placeholder="Cari di utang"
            placeholderTextColor={colors.accent}
          />
        </View>
        {editMode && (
          <View className="px-4 flex-row gap-x-2 w-1/2 items-center justify-end">
            <CheckBox
              value={checkbox}
              tintColors={{true: colors.err, false: colors.err}}
              onValueChange={value => {
                setCheckbox(value);
              }}
            />
            <TouchableOpacity>
              <IconTrash color={colors.err} size={26} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView
        id="content"
        className="mt-4 "
        scrollEventThrottle={400}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setNavHide(true);
          } else {
            !editMode && setNavHide(false);
          }
        }}>
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="Joe"
          category="Voucher"
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardReceivable
          checkValue={checkbox}
          id={1}
          note="john Doe"
          category="Pulsa"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={8000}
        />
      </ScrollView>
      <ReceivableModal {...{setShowModal, showModal}} />
    </View>
  );
};

export default Receivable;
