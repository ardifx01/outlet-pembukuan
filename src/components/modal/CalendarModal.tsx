import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import ReactNativeModal from 'react-native-modal';
import colors from '../../../assets/colors';
import {Text, TouchableOpacity, View} from 'react-native';
import ToggleButton from '../ToggleButton';
import {IconX} from 'tabler-icons-react-native';
import days from '../../lib/time';
type enumFilter = 'Minggu' | 'Bulan' | 'Tahun';
export type time = [string, string, enumFilter?] | null;
type CMProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  time: time;
  setTime: (date: time) => void | Dispatch<SetStateAction<time>>;
};
const CalendarModal = ({showModal, setShowModal, setTime, time}: CMProps) => {
  const hideModal = () => setShowModal(false);
  const [startDate, setStartDate] = useState<string | null>(
    time ? days(time[0]).format('DD-MM-YYYY') : null,
  );
  const [endDate, setEndDate] = useState<string | null>(time ? time[1] : null);
  const [range, setRange] = useState(false);

  useEffect(() => {
    setEndDate(null);
  }, [range]);

  const setDates = () => {
    if (startDate && endDate) {
      setTime([
        days(startDate).startOf('day').toISOString(),
        days(endDate).endOf('day').toISOString(),
      ]);
    } else {
      setTime(null);
    }
    hideModal();
  };

  const rangeSelect = (day: DateData) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else {
      setEndDate(day.dateString);
    }
  };

  const singleSelect = (day: DateData) => {
    setStartDate(day.dateString);
    setEndDate(day.dateString);
  };

  const markedRangeDates: MarkedDates = {};
  if (startDate) {
    markedRangeDates[startDate] = {
      startingDay: true,
      color: colors.accent,
      customTextStyle: {
        fontFamily: 'SourceSansProSemiBold',
        color: 'white',
      },
    };
    if (endDate) {
      markedRangeDates[endDate] = {
        endingDay: true,
        color: colors.accent,
        customTextStyle: {
          fontFamily: 'SourceSansProSemiBold',
          color: 'white',
        },
      };

      // Mark dates between startDate and endDate
      let currentDate = new Date(startDate);
      while (currentDate < new Date(endDate)) {
        currentDate.setDate(currentDate.getDate() + 1);
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateString !== endDate) {
          markedRangeDates[dateString] = {
            color: colors.border,
            textColor: colors.primary,
          };
        }
      }
    }
  }

  const markedSingleDates: MarkedDates = {};
  if (startDate)
    markedSingleDates[startDate] = {
      customStyles: {
        container: {
          backgroundColor: colors.accent,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          fontFamily: 'SourceSansProSemiBold',
          color: 'white',
        },
      },
    };

  const lastWeek = () => {
    setShowModal(false);
    const lastWeek = days().subtract(1, 'week');
    setTime([
      lastWeek.startOf('week').toISOString(),
      lastWeek.endOf('week').toISOString(),
      'Minggu',
    ]);
  };
  const lastMonth = () => {
    setShowModal(false);
    const lastMonth = days().subtract(1, 'month');
    setTime([
      lastMonth.startOf('month').toISOString(),
      lastMonth.endOf('month').toISOString(),
      'Bulan',
    ]);
  };

  const lastYear = () => {
    setShowModal(false);
    const lastYear = days().subtract(1, 'year');
    setTime([
      lastYear.startOf('year').toISOString(),
      lastYear.endOf('year').toISOString(),
      'Tahun',
    ]);
  };

  return (
    <ReactNativeModal
      isVisible={showModal}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      className="items-center">
      <View className="w-full px-4 bg-white rounded-lg">
        <View className="flex-row items-center justify-between py-1">
          <View className="flex-row items-center pt-3 px-2 gap-3">
            <Text className="font-sourceSansProSemiBold text-accent text-base">
              Pilih rentang
            </Text>
            <View className="flex-row items-end py-1">
              <ToggleButton {...{setToggle: setRange, toggle: range}} />
            </View>
          </View>
          <TouchableOpacity className="-mr-[7px]" onPress={hideModal}>
            <IconX color={colors.err} />
          </TouchableOpacity>
        </View>
        <Calendar
          onDayPress={range ? rangeSelect : singleSelect}
          markedDates={range ? markedRangeDates : markedSingleDates}
          markingType={range ? 'period' : 'custom'}
        />
        <View className="justify-end px-4 py-5 flex-row gap-6">
          <TouchableOpacity
            onPress={() => {
              setStartDate(null);
              setEndDate(null);
            }}>
            <Text className="font-sourceSansProSemiBold text-err text-base">
              Hapus
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={setDates}>
            <Text className="font-sourceSansProSemiBold text-accent text-base">
              Terapkan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full px-4 flex-row py-2 justify-around bg-white rounded-lg mt-3">
        <TouchableOpacity
          onPress={lastWeek}
          className="py-2 px-3 border-interaction border rounded-lg">
          <Text className="font-sourceSansProSemiBold text-interaction">
            Minggu Lalu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={lastMonth}
          className="py-2 px-3 border-interaction border rounded-lg">
          <Text className="font-sourceSansProSemiBold text-interaction">
            Bulan Lalu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={lastYear}
          className="py-2 px-3 border-interaction border rounded-lg">
          <Text className="font-sourceSansProSemiBold text-interaction">
            Tahun Lalu
          </Text>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

export default CalendarModal;
