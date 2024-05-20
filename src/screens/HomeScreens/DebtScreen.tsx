import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonOpt from '../../components/button/ButtonOption';
import colors from '../../../assets/colors';
import {
  IconAdjustments,
  IconSearch,
  IconTrash,
} from 'tabler-icons-react-native';
import {CardDebt} from '../../components/cards/card-debt';
import AddButton from '../../components/button/AddButton';
import DebtModal from '../../components/modal/DebtModal';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import isCloseToBottom from '../../lib/navigation';
import {NavContext, navInitialContext} from '../../context/NavigationContext';
import CheckBox from '@react-native-community/checkbox';

const Debt = () => {
  const [showModal, setShowModal] = useState(false);
  const {setNavHide, editMode} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);

  return (
    <View className="h-full bg-white">
      <AddButton onPress={() => setShowModal(true)} />
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
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Joe"
          expense={{name: 'Minuman', created_at: 'Hari ini'}}
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Jhon"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Joe"
          expense={{name: 'Minuman', created_at: 'Hari ini'}}
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Jhon"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Joe"
          expense={{name: 'Minuman', created_at: 'Hari ini'}}
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Jhon"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Joe"
          expense={{name: 'Minuman', created_at: 'Hari ini'}}
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Jhon"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Joe"
          expense={{name: 'Minuman', created_at: 'Hari ini'}}
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Jhon"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Joe"
          expense={{name: 'Minuman', created_at: 'Hari ini'}}
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Jhon"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Joe"
          expense={{name: 'Minuman', created_at: 'Hari ini'}}
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Jhon"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Joe"
          expense={{name: 'Minuman', created_at: 'Hari ini'}}
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Jhon"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Joe"
          expense={{name: 'Minuman', created_at: 'Hari ini'}}
          created_at="Hari ini - 12:30:54"
          paid={false}
          total={23000}
        />
        <CardDebt
          checkValue={checkbox}
          id={1}
          note="Jhon"
          created_at="Hari ini - 12:30:54"
          paid={true}
          total={23000}
        />
      </ScrollView>

      <DebtModal {...{setShowModal, showModal}} />
    </View>
  );
};

export default Debt;
