import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
  RefreshControl,
  Text,
} from 'react-native';
import {IconSearch, IconTrash, IconX} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';
import AddButton from '../../components/button/AddButton';
import {useCallback, useContext, useEffect, useState} from 'react';
import {NavContext, navInitialContext} from '../../context/NavigationContext';
import CheckBox from '@react-native-community/checkbox';
import isCloseToBottom from '../../lib/navigation';
import CardCategory from '../../components/cards/card-category';
import CategoryModal from '../../components/modal/CategoryModal';
import {Category} from '../../global/types/category';
import NotFound from '../../components/NotFound';
import Each from '../../components/Each';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import {useDebounce} from 'use-debounce';
import {ErrorHandler} from '../../lib/Error';

const CategoryScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const {editMode, setNavHide} = useContext(NavContext) as navInitialContext;
  const [checkbox, setCheckbox] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {data: categories, refresh} = useFetch<Category>('api/category/list');
  const {itemSelected, deleteItems, select, unSelect, deleteItem} = useDelete(
    'api/category',
    refresh,
  );
  const [search, setSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Category[] | null>(null);
  const [edit, setEdit] = useState<Category | null>(null);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    !showModal && setEdit(null);
  }, [showModal]);

  useEffect(() => {
    if (!editMode) {
      setCheckbox(true);
      setTimeout(() => {
        setCheckbox(false);
      }, 0);
    }
  }, [editMode]);

  const [searchDobouced] = useDebounce(search, 1000);

  useEffect(() => {
    const newSearched = categories?.filter(category =>
      category.name.toLowerCase().includes(searchDobouced.toLowerCase()),
    );
    newSearched?.length == 0
      ? setSearchResult(null)
      : setSearchResult(newSearched!);
  }, [searchDobouced]);

  const deleteCategory = (item: Category) => {
    Alert.alert(
      'Hapus!!!',
      `Apakah anda ingin menghapus kategori ${item.name}?`,
      [
        {
          text: 'Batal',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            setRefreshing(true);
            const [id, error] = await deleteItem(item.id);
            id && refresh();
            error && ErrorHandler(error);
            setRefreshing(false);
          },
        },
      ],
    );
  };

  const onDeletes = () => {
    if (itemSelected.length == 0) return;
    Alert.alert(
      'Hapus!!!',
      'Apakah anda ingin mengahpus kategori yang dipilih?',
      [
        {
          text: 'Batal',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            await deleteItems();
            setCheckbox(false);
          },
        },
      ],
    );
  };
  return (
    <View className="bg-white h-full">
      <AddButton onPress={() => setShowModal(true)} />
      <View className="flex-row justify-between mt-4 mx-6">
        <View className="border-b-[1px] flex-row justify-between w-1/2 border-accent items-center">
          <View className="flex-row flex mt-1 pb-[5px]">
            <IconSearch size={23} color={colors.accent} />
            <TextInput
              onChangeText={text => {
                setSearch(text);
              }}
              value={search}
              className="p-0 mx-1 h-6 text-[15px] text-accent"
              placeholder="Cari di kategori"
              placeholderTextColor={colors.accent}
            />
          </View>
          {search && (
            <TouchableOpacity
              onPress={() => {
                setSearch('');
                Keyboard.dismiss();
              }}
              className="mt-1 mr-1">
              <IconX size={20} color={colors.secondary} />
            </TouchableOpacity>
          )}
        </View>
        {editMode && (
          <View className="flex-row gap-x-2 w-1/2 items-center justify-end ">
            <CheckBox
              value={checkbox}
              tintColors={{true: colors.err, false: colors.err}}
              onValueChange={value => {
                setCheckbox(value);
              }}
            />

            <TouchableOpacity onPress={onDeletes}>
              <IconTrash color={colors.err} size={26} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.accent]}
            progressBackgroundColor={colors.border}
          />
        }
        id="content"
        className="mt-4 "
        scrollEventThrottle={400}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setNavHide(true);
          } else {
            !editMode && setNavHide(false);
          }
        }}>
        <Each<Category>
          of={searchDobouced ? searchResult : categories}
          render={(item: Category, index: number) => (
            <CardCategory
              key={item.id}
              name={item.name}
              checkValue={checkbox}
              onCheck={() => {
                select(item.id);
              }}
              onUnCheck={() => {
                unSelect(item.id);
              }}
              onEdit={() => {
                setEdit(item);
                setShowModal(true);
              }}
              onDelete={() => {
                deleteCategory(item);
              }}
            />
          )}
          ifNull={<NotFound>Kategori tidak ditemukan</NotFound>}
        />
      </ScrollView>
      <CategoryModal {...{setShowModal, showModal, refresh, edit}} />
    </View>
  );
};

export default CategoryScreen;
