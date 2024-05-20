import {ReactNode, useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavContext, navInitialContext} from '../context/NavigationContext';
import {IconEdit, IconRefresh} from 'tabler-icons-react-native';

const Header: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <View className="flex flex-row py-5 bg-primary rounded-b-[25px] justify-between px-5 items-center">
      {children}
    </View>
  );
};

const HeaderBtn = ({onRefresh}: {onRefresh: () => void}) => {
  const {editMode, setEditMode, setNavHide} = useContext(
    NavContext,
  ) as navInitialContext;

  return (
    <>
      {editMode ? (
        <TouchableOpacity
          onPress={() => {
            setEditMode(false);
            setNavHide(false);
          }}
          className="mr-4 bg-secondary px-6 py-1 rounded-full">
          <Text className="text-white font-sourceSansProSemiBold text-base">
            Selesai
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="flex flex-row gap-7 pr-3">
          <TouchableOpacity onPress={onRefresh}>
            <IconRefresh size={31} color="#fff" stroke={1.5} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEditMode(true);
              setNavHide(true);
            }}>
            <IconEdit size={31} color="#fff" stroke={1.5} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Header;
export {HeaderBtn};
