import {Text, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {IconArrowsMinimize, IconMinimize} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import {LineChart} from 'react-native-chart-kit';
import {formatNumber} from '../../lib/currency';
import {Report} from '../../screens/ReportScreen/ReportScreen';
import {Dispatch, SetStateAction, useState} from 'react';
import DotChart from '../DotChart';

const ChartFullScreen = ({
  report,
  show,
  setShow,
}: {
  report: Report | null;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [modalSize, setModalSize] = useState({width: 0, height: 0});
  const [showDotIndex, setShowDotIndex] = useState<null | number>(null);
  return (
    <ReactNativeModal className="" isVisible={show}>
      <View
        className="bg-white rounded-xl h-full w-full overflow-hidden pr-10"
        onLayout={({nativeEvent}) => {
          setModalSize({
            width: nativeEvent.layout.width,
            height: nativeEvent.layout.height,
          });
        }}>
        <TouchableOpacity
          onPress={() => setShow(false)}
          className="absolute right-2 bottom-2 z-50">
          <IconArrowsMinimize color={colors.interaction} size={24} />
        </TouchableOpacity>
        {report && (
          <LineChart
            data={{
              labels: report.label,
              datasets: [
                {
                  data: report.dataset,
                },
              ],
            }}
            segments={6}
            width={modalSize.height - 5}
            height={modalSize.width - 5}
            yAxisInterval={1}
            formatYLabel={yValue => formatNumber(parseInt(yValue))}
            fromZero
            renderDotContent={({x, y, indexData, index}) => (
              <TouchableOpacity
                key={index}
                onPress={() => setShowDotIndex(null)}
                style={{
                  display: showDotIndex == index ? 'flex' : 'none',
                }}>
                <DotChart {...{x, y, index, indexData}} />
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
              propsForDots: {
                r: '4',
                strokeWidth: '1',
              },
            }}
            yLabelsOffset={8}
            bezier
            style={{
              //   marginVertical: 10,
              //   marginRight: 5,
              marginTop: -23,
              //   borderRadius: 16,
              transform: [{rotate: '90deg'}],
            }}
          />
        )}
      </View>
    </ReactNativeModal>
  );
};

export default ChartFullScreen;
