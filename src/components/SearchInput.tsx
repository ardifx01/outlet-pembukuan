import {TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';
import {IconSearch, IconX} from 'tabler-icons-react-native';
import colors from '../../assets/colors';
import {Dispatch, SetStateAction} from 'react';

const SearchInput = ({
  search,
  setSearch,
  placeHolder,
  style,
}: {
  search: string | null;
  setSearch: Dispatch<SetStateAction<string | null>>;
  placeHolder: string;
  style?: ViewStyle;
}) => {
  return (
    <View
      style={style}
      className="border-b-[1px] flex-row flex mt-1 pb-[5px] w-2/4 border-accent">
      <IconSearch size={23} color={colors.accent} />
      <TextInput
        onChangeText={text => {
          !text ? setSearch(null) : setSearch(text);
        }}
        value={search || ''}
        className="p-0 mx-1 h-6 text-[15px] text-accent flex-1"
        placeholder={placeHolder}
        placeholderTextColor={colors.accent}
      />
      <TouchableOpacity
        style={{display: search && search.length > 0 ? 'flex' : 'none'}}
        className={'mt-1'}
        onPress={() => setSearch(null)}>
        <IconX color={colors.err} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
