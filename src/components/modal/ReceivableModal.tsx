import {useContext} from 'react';
import ReactNativeModal from 'react-native-modal';
import {View, Text, TextInput} from 'react-native';
import Button from '../Button';
import {IconCheck, IconX} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import ModalBody, {ModalState} from './ModalBody';

const ReceivableModal = ({setShowModal, showModal}: ModalState) => {
  return (
    <ModalBody
      title="Tambah Piutang"
      onSubmit={() => {}}
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

export default ReceivableModal;
