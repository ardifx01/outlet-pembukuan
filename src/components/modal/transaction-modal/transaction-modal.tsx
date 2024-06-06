import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {TabBar, TabView} from 'react-native-tab-view';
import colors from '../../../../assets/colors';
import ExpenseForm from './expense-form';
import SaleForm from './sale-form';
import {
  TrxModalContext,
  TrxModalInitialContext,
} from '../../../screens/HomeScreens/TransactionScreen';

const TrxModal = (): JSX.Element => {
  const {showModal, setShowModal} = useContext(
    TrxModalContext,
  ) as TrxModalInitialContext;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'sale', title: 'Penjualan'},
    {key: 'expense', title: 'Pengeluaran'},
  ]);
  const [headerOffset, setHeaderOffset] = useState(0);
  const layout = useWindowDimensions();
  return (
    <Modal
      isVisible={showModal}
      avoidKeyboard={true}
      onBackdropPress={() => setShowModal(false)}
      onBackButtonPress={() => setShowModal(false)}
      animationInTiming={400}
      animationOutTiming={400}
      swipeDirection={[]}
      className="m-0 justify-end">
      <View
        className="h-[609px] max-h-full bg-white rounded-t-[40px] px-3 min-w-full"
        onLayout={e => {
          setHeaderOffset(e.nativeEvent.layout.y + 68);
        }}>
        <View className="w-1/4 h-1 bg-accent mt-2 rounded-full self-center"></View>
        <TabView
          initialLayout={{
            width: layout.width - (layout.width / 100) * 10,
          }}
          navigationState={{index, routes}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'sale':
                return <SaleForm {...{headerOffset}} />;
              case 'expense':
                return <ExpenseForm />;
              default:
                return null;
            }
          }}
          onIndexChange={setIndex}
          renderTabBar={TabBarView}
        />
      </View>
    </Modal>
  );
};

const TabBarView = (props: any) => (
  <TabBar
    {...props}
    style={{
      backgroundColor: colors.border,
      shadowColor: 'transparent',
      marginTop: 10,
      borderRadius: 100,
    }}
    activeColor={'#fff'}
    inactiveColor={colors.accent}
    indicatorStyle={{
      height: '100%',
      borderRadius: 100,
      backgroundColor: colors.accent,
    }}
    pressColor={colors.border}
    renderLabel={({route, focused, color}) => (
      <TouchableOpacity>
        <Text
          className="font-sourceSansProSemiBold text-lg"
          style={{color: color}}>
          {route.title}
        </Text>
      </TouchableOpacity>
    )}
  />
);
export default TrxModal;
