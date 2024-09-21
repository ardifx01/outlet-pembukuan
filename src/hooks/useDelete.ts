import {useContext, useEffect, useState} from 'react';
import http from '../lib/axios';
import {AuthContext, initAuthContext} from '../context/AuthenticationContext';
import {Alert} from 'react-native';
import {NavContext, navInitialContext} from '../navigation/TabNavigation';

const useDelete = (url: string, onSuccess: () => void = () => {}) => {
  const [itemSelected, setItemSelected] = useState<number[]>([]);
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;
  const {editMode} = useContext(NavContext) as navInitialContext;

  useEffect(() => {
    if (!editMode) {
      setItemSelected([]);
    }
  }, [editMode]);

  const select = (id: number) => {
    setItemSelected(itemSelected => [...itemSelected, id]);
  };
  const unSelect = (id: number) => {
    setItemSelected(itemSelected =>
      itemSelected.filter(selected => selected != id),
    );
  };

  const deleteItem = async (
    id: number,
  ): Promise<[number | null, string | null]> => {
    try {
      await http.delete(`${url}/${id}`);
      return [id, null];
    } catch (err: any) {
      const error_message = err.response?.data.error || err.message;
      return [null, error_message];
    }
  };

  const deleteItems = async (alert: boolean = true) => {
    if (itemSelected.length == 0) return;
    setIsLoading(true);

    const error: string[] = [];
    const deleted: number[] = [];
    for (let i = 0; i < itemSelected.length; i++) {
      const [id, message] = await deleteItem(itemSelected[i]);
      id && deleted.push(id);
      message && error.push(message);
    }
    setIsLoading(false);
    if (deleted.length != 0) {
      onSuccess();
    }
    setItemSelected(itemSelected =>
      itemSelected.filter(id => !deleted.includes(id)),
    );
    if (error.length != 0 && alert) {
      Alert.alert('Error', error.join('\n'));
    } else if (!alert) {
      return error;
    }
  };
  return {itemSelected, deleteItems, deleteItem, unSelect, select};
};

export default useDelete;
