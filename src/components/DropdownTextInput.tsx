import {
  Dispatch,
  forwardRef,
  LegacyRef,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Dimensions, StyleProp, Text, TextInput, ViewStyle} from 'react-native';
import {
  AutocompleteDropdown,
  AutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown';
import colors from '../../assets/colors';
import {IconChevronDown, IconCircleX} from 'tabler-icons-react-native';

const DropdownTextInput = ({
  setSelect,
  data,
  selected,
  headerOffset,
  placeHolder = '...',
  suggestionStyle = {},
  onOpenSuggestionsList = async () => {},
  loading,
  useFilter = true,
  onChangeText,
  debounce,
  emptyRes = 'Tidak ditemukan',
  showChevron = true,
  fixOpenSuggestion = true,
}: {
  setSelect: Dispatch<SetStateAction<any>>;
  data: {id: string; title: string}[] | null;
  selected: string;
  headerOffset: number;
  placeHolder?: string;
  suggestionStyle?: StyleProp<ViewStyle>;
  onOpenSuggestionsList?: (isOpened: boolean) => Promise<void>;
  loading?: boolean;
  useFilter?: boolean;
  onChangeText?: (text: string) => void;
  debounce?: number;
  emptyRes?: string;
  showChevron?: boolean;
  fixOpenSuggestion?: boolean;
}) => {
  const dropdownController = useRef<null | AutocompleteDropdownRef>(null);
  const searchRef = useRef<null | TextInput>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onOpenSuggestionsListHandler = async (isOpened: boolean) => {
    setIsOpen(isOpened);
    await onOpenSuggestionsList(isOpened);
  };
  useEffect(() => {}, [emptyRes]);
  useEffect(() => {
    if (isOpen && fixOpenSuggestion) {
      dropdownController.current?.close();
    } else if (isOpen) {
      dropdownController.current?.close();
      dropdownController.current?.open();
    }
  }, [headerOffset]);
  return (
    <AutocompleteDropdown
      ref={searchRef}
      controller={controller => {
        dropdownController.current = controller;
      }}
      direction="down"
      clearOnFocus={false}
      dataSet={data}
      closeOnBlur={true}
      debounce={debounce}
      useFilter={useFilter}
      onSelectItem={value => value && setSelect(value)}
      initialValue={selected}
      suggestionsListMaxHeight={200}
      onChangeText={onChangeText}
      suggestionsListTextStyle={{
        margin: 0,
      }}
      loading={loading}
      onOpenSuggestionsList={onOpenSuggestionsListHandler}
      renderItem={(item, text) => (
        <Text className="text-primary font-sourceSansProSemiBold p-[15px] text-base">
          {item.title}
        </Text>
      )}
      // useFilter={false} // set false to prevent rerender twice
      textInputProps={{
        placeholder: placeHolder,
        autoCorrect: false,
        autoCapitalize: 'none',
        placeholderTextColor: colors.secondary,
        style: {
          borderRadius: 6,
          backgroundColor: colors.border,
          color: colors.primary,
          paddingLeft: 18,
          fontFamily: 'SourceSansProSemiBold',
        },
      }}
      rightButtonsContainerStyle={{
        right: 0,
        paddingRight: 10,
        backgroundColor: colors.border,
        borderRadius: 6,
        display: 'flex',
        gap: 2,
        alignItems: 'center',
      }}
      suggestionsListContainerStyle={{
        backgroundColor: colors.border,
        width: Dimensions.get('window').width * 0.92,
        marginLeft: -8,
        marginTop: 0,
        ...(suggestionStyle as object),
      }}
      containerStyle={{flexGrow: 1, flexShrink: 1}}
      showChevron={showChevron}
      ChevronIconComponent={
        <IconChevronDown size={23} color={colors.secondary} />
      }
      ClearIconComponent={<IconCircleX size={20} color={colors.secondary} />}
      onClear={() => {
        setSelect('');
      }}
      emptyResultText={emptyRes}
    />
  );
};

export default DropdownTextInput;
