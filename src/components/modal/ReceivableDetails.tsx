import {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {Receivable} from '../../global/types/Receivable';
import ReactNativeModal from 'react-native-modal';
import {Alert, Text, View} from 'react-native';
import {getDate} from '../../lib/time';
import currency from '../../lib/currency';
import Btn from '../button/ModalButton';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import http from '../../lib/axios';
import {ErrorHandler} from '../../lib/Error';

const ReceivableDetails = ({
  refresh,
  receivable,
  setReceivable,
}: {
  refresh: () => void;
  setReceivable: Dispatch<SetStateAction<Receivable | null>>;
  receivable: Receivable | null;
}) => {
  const [show, setShow] = useState(false);
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;
  useEffect(() => {
    receivable ? setShow(true) : setShow(false);
  }, [receivable]);
  const close = () => setReceivable(null);

  const paidHanler = () => {
    Alert.alert('Lunas ?', 'Tandai piutang ini sudah Lunas ?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ok',
        style: 'default',
        onPress: async () => {
          const id = receivable?.id;
          try {
            setReceivable(null);
            setIsLoading(true);
            await http.patch('api/receivable/' + id, {
              paid: true,
            });
            refresh();
          } catch (error) {
            ErrorHandler(error);
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };
  return (
    <ReactNativeModal
      onBackdropPress={close}
      isVisible={show}
      animationIn={'zoomIn'}
      className="items-center">
      <View className="bg-white w-11/12 rounded-md pt-6 pb-6 px-8">
        <Text className="text-lg text-center font-sourceSansProSemiBold text-primary mb-2">
          Rincian Piutang
        </Text>

        {receivable && (
          <>
            {receivable.sale && (
              <>
                <View className="flex-row w-full">
                  <Text className="font-sourceSansProSemiBold text-base w-full flex-1 text-interaction">
                    Nama Produk
                  </Text>
                  <Text className="font-sourceSansProSemiBold text-base w-full  flex-1 text-interaction">
                    {receivable.sale.name}
                  </Text>
                </View>
                <View className="flex-row w-full">
                  <Text className="font-sourceSansProSemiBold text-base w-full flex-1 text-interaction">
                    Kategori
                  </Text>
                  <Text className="font-sourceSansProSemiBold text-base w-full  flex-1 text-interaction">
                    {receivable.sale.category}
                  </Text>
                </View>
              </>
            )}
            <View className="flex-row w-full">
              <Text className="font-sourceSansProSemiBold text-base w-full flex-1 text-err">
                Tanggal
              </Text>
              <Text className="font-sourceSansProSemiBold text-base w-full text-err flex-1">
                {receivable.sale
                  ? getDate(receivable.sale.created_at, true, false)
                  : getDate(receivable.created_at, true, false)}
              </Text>
            </View>

            {receivable.paid && (
              <View className="flex-row w-full">
                <Text className="flex-1 font-sourceSansProSemiBold text-base w-full text-success">
                  Lunas
                </Text>
                <Text className="font-sourceSansProSemiBold text-base w-full text-success flex-1">
                  {getDate(receivable.updated_at, true)}
                </Text>
              </View>
            )}

            <View className="border-dashed border-2 border-border px-2 pt-1 pb-2 mt-1">
              {receivable.paid && (
                <Text className="absolute z-10 top-[20%] right-[15%] -rotate-[20deg] text-6xl uppercase border-2 border-success pt-3 px-3 text-center align-middle font-sourceSansProSemiBold border-dashed text-success">
                  Lunas
                </Text>
              )}
              <View
                className={`w-full bg-border h-[72px] max-h-[120px] mt-1 rou  nded flex-nowrap`}>
                <Text className="text-interaction font-sourceSansPro text-base mx-1">
                  {`Catatan : \n ${receivable.note}`}
                </Text>
              </View>
              <View className="w-full bg-border mt-2 px-1 rounded flex-row justify-between items-center">
                <Text className="text-interaction font-sourceSansProSemiBold text-base">
                  Total :
                </Text>
                <Text className="font-sourceSansProSemiBold text-base text-err">
                  Rp {currency(receivable.total)}
                </Text>
              </View>
            </View>
          </>
        )}
        {receivable?.paid == false && (
          <View className="justify-between flex-row mt-6 px-1 mb-2">
            <Btn title="Tandai Lunas" type="ok" onPress={paidHanler} />
            <Btn
              title="Tutup"
              type="close"
              onPress={() => {
                setReceivable(null);
              }}
            />
          </View>
        )}
      </View>
    </ReactNativeModal>
  );
};

export default ReceivableDetails;
