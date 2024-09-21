import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import Header, {HeaderBtn} from '../components/Header';
import {
  IconChartLine,
  IconChartPie,
  IconEditCircle,
} from 'tabler-icons-react-native';
import colors from '../../assets/colors';
import FilterType from '../components/FilterType';
import days, {getDate} from '../lib/time';
import http from '../lib/axios';
import responseHandler from '../lib/responseHandler';
import {ErrorHandler} from '../lib/Error';
import {AuthContext, initAuthContext} from '../context/AuthenticationContext';
import currency, {formatNumber} from '../lib/currency';
import {LineChart, PieChart} from 'react-native-chart-kit';
import CalendarModal from '../components/modal/CalendarModal';
import NotFound from '../components/NotFound';
import {isArrayEmpty, isObjectEmpty} from '../lib/utils';
import {acumulationTransaction, monthDates} from '../lib/report';

type Sales = {basic_price: number; selling_price: number; created_at: string}[];
type Report = {label: string[]; dataset: number[]};
const ReportScreen = () => {
  const [time, setTime] = useState<
    [string, string, ('Minggu' | 'Bulan' | 'Tahun')?] | null
  >(null);
  const [report, setReport] = useState<Report | null>(null);
  const [totalHpp, setTotalHpp] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState({
    sales: 0,
    expense: 0,
  });
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;
  const [showDotIndex, setShowDotIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showChart, setShowChart] = useState(true);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const weekdays = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
  ];

  let period: string;
  if (time) {
    const start = getDate(time[0], false, false, true);
    const end = getDate(time[1], false, false, true);
    if (start == end) period = getDate(time[0], true, false, true);
    else period = `${start}- ${end}`;
  } else {
    period = getDate(days().toString());
  }
  const getReport = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await http.get('api/report', {
        params: {
          time: time ? [time[0], time[1]] : null,
        },
      });
      const {
        sales,
        totalExpense: expense,
      }: {sales: Sales; totalExpense: number} = responseHandler(res);

      let profit: {[key: string]: number};

      if (time && time[2]) {
        profit = acumulationTransaction(sales, time[2]);
        if (!isObjectEmpty(profit)) {
          let label: string[] = [];
          let dataset: Array<number>;
          if (time[2] == 'Minggu') {
            label = weekdays;
            dataset = new Array(7).fill(0);
            Object.keys(profit).every(
              key => (dataset[parseInt(key) - 1] = profit[key]),
            );
          } else if (time[2] == 'Tahun') {
            label = months;
            dataset = new Array(12).fill(0);
            Object.keys(profit).every(
              key => (dataset[parseInt(key) - 1] = profit[key]),
            );
          } else {
            label = monthDates.map(date => `Tanggal ${date.join('-')}`);
            dataset = new Array(4).fill(0);
            Object.keys(profit).every(key => {
              switch (key) {
                case '1-7':
                  dataset[0] = profit[key];
                case '7-15':
                  dataset[1] = profit[key];
                case '16-23':
                  dataset[2] = profit[key];
                default:
                  dataset[3] = profit[key];
              }
            });
          }
          setReport({dataset, label});
        } else setReport(null);
      } else setReport(null);
      const {totalBasicPrice, totalSellingPrice} = sales.reduce(
        (acc, sale) => {
          acc.totalBasicPrice += sale.basic_price;
          acc.totalSellingPrice += sale.selling_price;
          return acc;
        },
        {totalBasicPrice: 0, totalSellingPrice: 0},
      );
      setTotalHpp(totalBasicPrice);
      setTotalTransaction({sales: totalSellingPrice, expense: expense || 0});
    } catch (error: any) {
      if (error.response && error.response.status == 404) setReport(null);
      ErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }, [time]);

  useEffect(() => {
    getReport();
  }, [getReport]);
  return (
    <View className="bg-white h-full">
      <Header>
        <Text className="font-sourceSansProSemiBold text-white  px-5 rounded-full py-[1px] text-2xl">
          Laporan
        </Text>
        <HeaderBtn
          onRefresh={() => {
            getReport();
          }}
        />
      </Header>
      <View className="my-4 rounded-lg flex-row justify-between px-3 mx-4 py-2 bg-border">
        <View>
          <Text className="text-primary text-base font-sourceSansProSemiBold">
            Periode
          </Text>
          <Text className="text-accent text-base font-sourceSansProSemiBold">
            {period}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className="border border-accent rounded-lg px-2 items-center flex-row">
          <IconEditCircle size={25} color={colors.accent} />
          <Text className="text-accent text-base font-sourceSansProSemiBold ml-1">
            Ubah Periode
          </Text>
        </TouchableOpacity>
      </View>
      <FilterType
        defaultTitle="Hari Ini"
        show={true}
        title={['Minggu Ini', 'Bulan Ini', 'Tahun Ini']}
        types={[
          [
            days().startOf('week').toISOString(),
            days().endOf('week').toISOString(),
            'Minggu',
          ],
          [
            days().startOf('month').toISOString(),
            days().endOf('month').toISOString(),
            'Bulan',
          ],
          [
            days().startOf('year').toISOString(),
            days().endOf('year').toISOString(),
            'Tahun',
          ],
        ]}
        {...{setType: setTime, type: time}}
      />

      {time?.at(2) && !isObjectEmpty(totalTransaction) && (
        <TouchableOpacity
          onPress={() => setShowChart(show => !show)}
          className="flex-row ml-5 rounded-full bg-border mt-1 self-start">
          <View
            className={`py-1 px-2 rounded-full ${
              showChart ? 'bg-interaction' : 'bg-border'
            }`}>
            <IconChartLine
              size={20}
              color={showChart ? 'white' : colors.interaction}
            />
          </View>
          <View
            className={`py-1 px-2 rounded-full ${
              showChart ? 'bg-border' : 'bg-interaction'
            }`}>
            <IconChartPie
              color={showChart ? colors.interaction : 'white'}
              size={20}
            />
          </View>
        </TouchableOpacity>
      )}

      {report && !isArrayEmpty(report.dataset) && showChart && time?.at(2) ? (
        <>
          <Text className="font-sourceSansProSemiBold mt-2 text-center text-interaction">
            Grafik Pendapatan
          </Text>
          <LineChart
            data={{
              labels: report.label,
              datasets: [
                {
                  data: report.dataset,
                },
              ],
            }}
            segments={5}
            width={Dimensions.get('window').width}
            height={220}
            yAxisInterval={1}
            formatYLabel={yValue => formatNumber(parseInt(yValue))}
            fromZero
            renderDotContent={({x, y, indexData, index}) => (
              <TouchableOpacity
                key={index}
                onPress={() => setShowDotIndex(null)}
                style={{
                  position: 'absolute',
                  top: y + 5,
                  left: x,
                  backgroundColor: colors.interaction,
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  borderTopRightRadius: 50,
                  borderTopLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  transform: [{rotate: '90deg'}],
                  display: showDotIndex == index ? 'flex' : 'none',
                  zIndex: 100,
                }}>
                <Text className="font-sourceSansProSemiBold, text-white">
                  {formatNumber(indexData)}
                </Text>
              </TouchableOpacity>
            )}
            onDataPointClick={({index}) => {
              setShowDotIndex(dotIndex => (index == dotIndex ? null : index));
            }}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(64, 50, 250, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(50, 40, 199, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '1',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </>
      ) : !isObjectEmpty(totalTransaction) ? (
        <PieChart
          data={[
            {
              name: 'Pendapatan',
              total: totalTransaction.sales - totalHpp,
              color: colors.interaction,
              legendFontColor: colors.primary,
              legendFontSize: 15,
            },
            {
              name: 'Pengeluaran',
              total: totalTransaction.expense,
              color: colors.err,
              legendFontColor: colors.primary,
              legendFontSize: 15,
            },
          ]}
          width={Dimensions.get('screen').width}
          height={250}
          accessor={'total'}
          backgroundColor={'transparent'}
          chartConfig={{
            color: (opacity = 1) => `rgba(64, 50, 250, ${opacity})`,
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            propsForLabels: {
              fontFamily: 'SourceSansProSemiBold',
            },
          }}
          paddingLeft={'15'}
          center={[5, -5]}
        />
      ) : (
        <NotFound>{`Belum ada transaksi ${
          !time ? 'Hari' : 'periode'
        } ini :(`}</NotFound>
      )}
      {!isObjectEmpty(totalTransaction) ? (
        <View className="mt-2 mb-4 rounded-xl mx-4 py-2 bg-border">
          <View className="flex-row justify-between my-1 mx-4">
            <Text className="text-primary text-base font-sourceSansProSemiBold">
              Total Pendapatan Penjualan
            </Text>
            <Text className="text-accent text-base font-sourceSansProSemiBold">
              {currency(totalTransaction.sales, true)}
            </Text>
          </View>
          <View className="flex-row justify-between my-1 mx-4">
            <Text className="text-primary text-base font-sourceSansProSemiBold">
              Total Harga Pokok
            </Text>
            <Text className="text-err text-base font-sourceSansProSemiBold">
              {currency(totalHpp, true)}
            </Text>
          </View>
          <View className="border-b border-b-white"></View>
          <View className="flex-row justify-between my-1 mx-4">
            <Text className="text-primary text-base font-sourceSansProSemiBold">
              Total Laba
            </Text>
            <Text className="text-primary text-base font-sourceSansProSemiBold">
              {currency(totalTransaction.sales - totalHpp, true)}
            </Text>
          </View>
          <View className="flex-row justify-between my-1 mx-4">
            <Text className="text-primary text-base font-sourceSansProSemiBold">
              Total Pengeluaran
            </Text>
            <Text className="text-err text-base font-sourceSansProSemiBold">
              {currency(totalTransaction.expense, true)}
            </Text>
          </View>
          <View className="border-b border-b-white"></View>
          <View className="flex-row justify-between my-1 mx-4">
            <Text className="text-primary text-base font-sourceSansProSemiBold">
              Total Laba Bersih
            </Text>
            <Text
              className={`${
                totalTransaction.sales - totalHpp - totalTransaction.expense > 0
                  ? 'text-success'
                  : 'text-err'
              } text-base font-sourceSansProSemiBold`}>
              {currency(
                totalTransaction.sales - totalHpp - totalTransaction.expense,
                true,
              )}
            </Text>
          </View>
        </View>
      ) : null}
      <CalendarModal {...{setShowModal, showModal, setTime, time}} />
    </View>
  );
};

export default memo(ReportScreen);
