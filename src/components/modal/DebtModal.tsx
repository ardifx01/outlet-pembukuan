import {Text, TextInput, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {IconCheck, IconX} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {useContext} from 'react';
import ModalBody, {ModalState} from './ModalBody';

const DebtModal = ({setShowModal, showModal}: ModalState) => {
  return (
    <ModalBody
      onSubmit={() => {}}
      title="Tambah Utang"
      {...{setShowModal, showModal}}>
      <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent">
        Catatan
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={3}
        style={{textAlignVertical: 'top'}}
        className="bg-border px-3 rounded-md text-accent font-sourceSansProSemiBold text-base"
      />
      <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
        Total
      </Text>
      <TextInput
        inputMode="numeric"
        className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
      />
    </ModalBody>
  );
};

export default DebtModal;
