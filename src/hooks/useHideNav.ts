import {useContext, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../screens/UserScreens/UserStack';
import {NavContext, navInitialContext} from '../navigation/TabNavigation';

export default function useHideNav(
  navigation: NativeStackNavigationProp<RootStackParamList>,
) {
  const {setEditMode} = useContext(NavContext) as navInitialContext;
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setEditMode(true);
    });

    const unsubscribeBlur = navigation.addListener('beforeRemove', () => {
      setEditMode(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);
}
