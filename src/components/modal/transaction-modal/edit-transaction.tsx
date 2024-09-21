import {Text, TextInput, View} from 'react-native';
import ModalBody from '../ModalBody';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import ToggleButton from '../../ToggleButton';
import currency from '../../../lib/currency';
import compare from '../../../lib/object';
import http from '../../../lib/axios';
import {ErrorHandler} from '../../../lib/Error';

export type Edit = {
  id?: number;
  type: 'sale' | 'expense';
  title?: string;
  defaultValue: DefaultValue | undefined;
};
type DefaultValue = {
  id: number;
  note: string;
  total: number;
  paid: boolean;
};

const EditTransaction = ({
  edit,
  setEdit,
  refresh,
}: {
  edit: Edit | null;
  setEdit: Dispatch<SetStateAction<Edit | null>>;
  refresh: () => void;
}) => {
  const [value, setValue] = useState<DefaultValue | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const setShow = (show: boolean) => {
    !show ? setEdit(null) : setShowModal(true);
  };
  useEffect(() => {
    !edit ? setShowModal(false) : setShowModal(true);
    setValue(edit?.defaultValue || null);
  }, [edit]);

  const onSubmit = async () => {
    if (!value || !value.note || !value.total) return;
    if (compare(edit?.defaultValue, value)) return setEdit(null);
    const url = edit?.type == 'sale' ? 'api/receivable/' : 'api/debt/';
    if (edit?.defaultValue) {
      try {
        await http.patch(url + edit.defaultValue.id, {
          note: value.note,
          total: value.total,
          paid: value.paid,
        });
        setEdit(null);
        refresh();
      } catch (error) {
        ErrorHandler(error);
      }
    } else {
      try {
        const newValue =
          edit?.type == 'sale'
            ? {
                note: value.note,
                total: value.total,
                paid: value.paid || false,
                sale_id: edit.id,
              }
            : {
                note: value.note,
                total: value.total,
                paid: value.paid || false,
                expense: edit?.id,
              };

        await http.post(url, newValue);
        setEdit(null);
        refresh();
      } catch (error) {
        ErrorHandler(error);
      }
    }
  };
  return (
    <ModalBody
      edit={!!edit?.defaultValue}
      {...{showModal, setShowModal: setShow}}
      onSubmit={onSubmit}
      height="h-[425px]"
      title={`${edit?.defaultValue ? 'Edit' : 'Tambah'} ${
        edit?.type == 'sale' ? 'Piutang' : 'Utang'
      }`}>
      <Text className="font-sourceSansProSemiBold text-base pl-2 text-accent">
        Transaksi
      </Text>
      {edit?.title && (
        <Text className="font-sourceSansProSemiBold text-base pl-2 py-2 bg-border rounded text-accent">
          {edit.title}
        </Text>
      )}
      <Text className="font-sourceSansProSemiBold text-base pl-2 mt-2 text-accent">
        Catatan
      </Text>
      <TextInput
        value={value?.note || ''}
        onChangeText={text => {
          setValue(value => ({...(value as DefaultValue), note: text}));
        }}
        multiline={true}
        numberOfLines={3}
        maxLength={45}
        style={{textAlignVertical: 'top'}}
        className="bg-border px-3 rounded-md text-accent font-sourceSansProSemiBold text-base max-h-[80px]"
      />
      <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
        Total
      </Text>
      <TextInput
        value={value?.total ? currency(value.total) : ''}
        onChangeText={text => {
          const total: number = parseInt(
            text.replace(/[^0-9]/g, '').slice(0, 9),
          );
          setValue(value => ({
            ...(value as DefaultValue),
            total,
          }));
        }}
        inputMode="numeric"
        className="bg-border px-3 py-1 rounded-md text-accent font-sourceSansProSemiBold text-base"
      />
      {edit?.defaultValue && value && (
        <View className="flex-row items-center mt-1">
          <Text className="mt-2 font-sourceSansProSemiBold text-base pl-2 text-accent">
            Lunas
          </Text>
          <View className="mt-2 ml-3">
            <ToggleButton
              toggle={value?.paid}
              setToggle={(state: boolean) => {
                setValue(value => ({...(value as DefaultValue), paid: state}));
              }}
            />
          </View>
        </View>
      )}
    </ModalBody>
  );
};

export default EditTransaction;
