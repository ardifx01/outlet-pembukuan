import ReactNativeModal from 'react-native-modal';
import {expense, sale} from '../../../global/types/transaction';
import {Text, TouchableOpacity, View} from 'react-native';
import {IconX} from 'tabler-icons-react-native';
import colors from '../../../../assets/colors';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {getDate, getTime, timeFormat} from '../../../lib/time';
import currency from '../../../lib/currency';

const DetailTransaction = ({
  transaction,
  setTransaction,
}: {
  setTransaction: Dispatch<
    SetStateAction<sale<number> | expense<number> | null>
  >;
  transaction: sale<number> | expense<number> | null;
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    transaction ? setShow(true) : setShow(false);
  }, [transaction]);
  const close = () => setTransaction(null);
  const debtOrRec =
    transaction?.type == 'sale' ? transaction.receivable : transaction?.debt;
  return (
    <ReactNativeModal
      onBackdropPress={close}
      isVisible={show}
      className="items-center">
      <View className="bg-white w-11/12 rounded-md pt-6 pb-8 px-8">
        <Text className="text-lg text-center font-sourceSansProSemiBold text-primary mb-2">
          Rincian Transaksi
        </Text>

        {transaction?.type == 'sale' ? (
          <>
            <View className="flex-row w-full">
              <Text className="flex-1 text-interaction font-sourceSansPro text-base">
                Nama Produk
              </Text>
              <Text className="flex-1 text-interaction font-sourceSansProSemiBold text-base">
                {transaction.name}
              </Text>
            </View>
            <View className="flex-row w-full">
              <Text className="flex-1 text-interaction font-sourceSansPro text-base">
                Kategori
              </Text>
              <Text className="flex-1 text-interaction font-sourceSansProSemiBold text-base">
                {transaction.category}
              </Text>
            </View>
            <View className="flex-row w-full">
              <Text className="flex-1 text-interaction font-sourceSansPro text-base">
                Modal
              </Text>
              <Text className="flex-1 text-interaction font-sourceSansProSemiBold text-base">
                Rp {currency(transaction.basic_price)}
              </Text>
            </View>
            <View className="flex-row w-full">
              <Text className="flex-1 text-interaction font-sourceSansPro text-base">
                Harga
              </Text>
              <Text className="flex-1 text-interaction font-sourceSansProSemiBold text-base">
                Rp {currency(transaction.selling_price)}
              </Text>
            </View>
          </>
        ) : (
          <>
            <View className="flex-row w-full">
              <Text className="flex-1 text-interaction font-sourceSansPro text-base">
                Pengeluaran
              </Text>
              <Text className="flex-1 text-interaction font-sourceSansProSemiBold text-base">
                {transaction?.name}
              </Text>
            </View>
            <View className="flex-row w-full">
              <Text className="flex-1 text-interaction font-sourceSansPro text-base">
                Total
              </Text>
              <Text className="flex-1 text-interaction font-sourceSansProSemiBold text-base">
                Rp {transaction && currency(transaction?.total)}
              </Text>
            </View>
          </>
        )}
        <View className="flex-row w-full">
          <Text className="flex-1 text-interaction font-sourceSansPro text-base">
            Jam
          </Text>
          <Text className="flex-1 text-interaction font-sourceSansProSemiBold text-base">
            {transaction && getTime(transaction.created_at)}
          </Text>
        </View>
        <View className="flex-row w-full">
          <Text className="flex-1 text-interaction font-sourceSansPro text-base">
            Tanggal
          </Text>
          <Text className="flex-1 text-interaction font-sourceSansProSemiBold text-base">
            {transaction && getDate(transaction.created_at, true, false)}
          </Text>
        </View>
        {debtOrRec && (
          <>
            <Text className="font-sourceSansProSemiBold text-base w-full text-err mt-1">
              {transaction?.type == 'sale' ? 'Piutang' : 'Utang'}
            </Text>
            <View className="border-dashed border-2 border-border px-2 pt-1 pb-2">
              {debtOrRec.paid && (
                <Text className="absolute z-10 top-[20%] right-[15%] -rotate-[25deg] text-6xl uppercase border-2 border-success pt-3 px-3 text-center align-middle font-sourceSansProSemiBold border-dashed text-success">
                  Lunas
                </Text>
              )}
              <View
                className={`w-full bg-border h-[72px] max-h-[120px] mt-1 px-1 rounded`}>
                <Text className="text-interaction font-sourceSansPro text-base">
                  {`Catatan : \n ${debtOrRec.note}`}
                </Text>
              </View>
              <View className="w-full bg-border mt-2 px-1 rounded flex-row justify-between items-center">
                <Text className="text-interaction font-sourceSansProSemiBold text-base">
                  Total :
                </Text>
                <Text className="font-sourceSansProSemiBold text-base text-err">
                  Rp {currency(debtOrRec.total)}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </ReactNativeModal>
  );
};

export default DetailTransaction;
