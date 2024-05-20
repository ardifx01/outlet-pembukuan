import {useState} from 'react';
import {View} from 'react-native';
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from 'react-native-autocomplete-dropdown';

const Dropdown = ({modalHeight}: {modalHeight: number}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <AutocompleteDropdownContextProvider headerOffset={modalHeight}>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={{id: '2'}} // or just '2'
        onSelectItem={item => {
          item && setSelectedItem(item.id);
        }}
        dataSet={[
          {id: '1', title: 'Alpha'},
          {id: '2', title: 'Beta'},
          {id: '3', title: 'Gamma'},
        ]}
      />
    </AutocompleteDropdownContextProvider>
  );
};

export default Dropdown;
