import {Dispatch, ReactNode, SetStateAction} from 'react';
import {LayoutChangeEvent, Text, TextInput, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Button from '../button/Button';
import {IconCheck, IconX} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';

export type ModalState<T = any> = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
  edit?: T;
};

const ModalBody = ({
  showModal,
  setShowModal,
  title,
  children,
  onSubmit,
  height = 'h-[350px]',
  onLayout,
  onCancel = () => {},
  edit = false,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title?: string;
  children: ReactNode;
  onSubmit: () => void;
  onCancel?: () => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  height?: string;
  edit?: boolean;
}) => {
  return (
    <ReactNativeModal
      isVisible={showModal}
      onBackdropPress={() => {
        onCancel();
        setShowModal(false);
      }}
      onBackButtonPress={() => setShowModal(false)}
      animationInTiming={400}
      animationOutTiming={400}
      className="justify-end m-0">
      <View
        className={`${height} flex bg-white rounded-t-[35px] px-3`}
        onLayout={onLayout}>
        <View className="w-1/4 h-1 bg-accent mt-2 rounded-full self-center"></View>
        <View className="flex h-full mt-3 justify-between pb-10">
          <View className="px-2">
            {title && (
              <Text className="self-center font-sourceSansProSemiBold bg-accent text-white w-full text-center py-2 text-lg rounded-full mb-3">
                {title}
              </Text>
            )}
            {children}
          </View>
          <View className="flex flex-row justify-around mt-3 w-full items-end">
            <Button
              icon={<IconX size={20} color={colors.primary} />}
              onPress={() => {
                setShowModal(false);
                onCancel();
              }}
              classname="bg-border w-[45%]"
              textColor={colors.primary}>
              Batalkan
            </Button>
            <Button
              icon={<IconCheck size={20} color={'white'} />}
              onPress={onSubmit}
              classname="bg-accent w-[45%]"
              textColor={'white'}>
              {edit ? 'Simpan' : 'Tambahkan'}
            </Button>
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ModalBody;
