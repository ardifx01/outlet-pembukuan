import {Text, TextInput, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {IconCheck, IconX} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {useContext, useEffect, useState} from 'react';
import ModalBody, {ModalState} from './ModalBody';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import http from '../../lib/axios';
import {ErrorHandler} from '../../lib/Error';
import currency from '../../lib/currency';
type DebtForm = {
  note: string;
  total: number;
};

const DebtModal = ({setShowModal, showModal, refresh}: ModalState) => {
  const [debt, setDebt] = useState<DebtForm>({
    note: '',
    total: 0,
  });

  const {setIsLoading} = useContext(AuthContext) as initAuthContext;

  const submitHandler = async () => {
    if (!debt.note || !debt.total) return;
    setShowModal(false);
    setIsLoading(true);
    try {
      await http.post('api/debt', debt);
      refresh();
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setDebt({note: '', total: 0});
  }, [showModal]);
  return (
    <ModalBody
      onSubmit={submitHandler}
      title="Tambah Utang"
      {...{setShowModal, showModal}}>
      <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent">
        Catatan
      </Text>
      <TextInput
        value={debt.note}
        onChangeText={text => setDebt(debt => ({...debt, note: text}))}
        multiline={true}
        numberOfLines={3}
        style={{textAlignVertical: 'top'}}
        className="bg-border px-3 rounded-md text-accent font-sourceSansProSemiBold text-base"
      />
      <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
        Total
      </Text>
      <TextInput
        value={debt.total ? currency(debt.total) : ''}
        onChangeText={text => {
          const total: number = parseInt(
            text.replace(/[^0-9]/g, '').slice(0, 9),
          );
          setDebt(debt => ({...debt, total}));
        }}
        inputMode="numeric"
        className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
      />
    </ModalBody>
  );
};

export default DebtModal;
