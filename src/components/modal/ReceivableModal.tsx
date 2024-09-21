import {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import ModalBody, {ModalState} from './ModalBody';
import currency from '../../lib/currency';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import http from '../../lib/axios';
import {ErrorHandler} from '../../lib/Error';

type ReceivableForm = {
  note: string;
  total: number;
};

const ReceivableModal = ({setShowModal, showModal, refresh}: ModalState) => {
  const [receivable, setReceivable] = useState<ReceivableForm>({
    note: '',
    total: 0,
  });

  const {setIsLoading} = useContext(AuthContext) as initAuthContext;

  const submitHandler = async () => {
    if (!receivable.note || !receivable.total) return;
    setShowModal(false);
    setIsLoading(true);
    try {
      await http.post('api/receivable', receivable);
      refresh();
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setReceivable({note: '', total: 0});
  }, [showModal]);
  return (
    <ModalBody
      title="Tambah Piutang"
      onSubmit={submitHandler}
      {...{setShowModal, showModal}}>
      <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent">
        Catatan
      </Text>
      <TextInput
        value={receivable.note}
        onChangeText={text =>
          setReceivable(receivable => ({...receivable, note: text}))
        }
        multiline={true}
        numberOfLines={3}
        style={{textAlignVertical: 'top'}}
        className="bg-border px-3 rounded-md text-accent font-sourceSansProSemiBold text-base"
      />
      <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
        Total
      </Text>
      <TextInput
        value={receivable.total ? currency(receivable.total) : ''}
        onChangeText={text => {
          const total: number = parseInt(
            text.replace(/[^0-9]/g, '').slice(0, 9),
          );
          setReceivable(receivable => ({...receivable, total}));
        }}
        inputMode="numeric"
        className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
      />
    </ModalBody>
  );
};

export default ReceivableModal;
