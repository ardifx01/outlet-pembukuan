import {TextInput} from 'react-native';
import ModalBody, {ModalState} from './ModalBody';
import colors from '../../../assets/colors';
import {useContext, useEffect, useState} from 'react';
import {Category} from '../../global/types/category';
import http from '../../lib/axios';
import {
  AuthContext,
  initAuthContext,
} from '../../context/AuthenticationContext';
import {ErrorHandler} from '../../lib/Error';

const CategoryModal = ({
  showModal,
  setShowModal,
  refresh,
  edit = null,
}: ModalState<Category | null>) => {
  const [category, setCategory] = useState('');
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;
  const createCategory = async () => {
    setIsLoading(true);
    try {
      await http.post('api/category', {name: category});
      refresh();
      setCategory('');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };

  useEffect(() => {
    setCategory(edit?.name || '');
  }, [edit]);

  const editCategory = async () => {
    if (category === edit?.name) return;
    setIsLoading(true);
    try {
      await http.patch(`api/category/${edit?.id}`, {name: category});
      refresh();
      setCategory('');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };

  const submitHandler = async () => {
    if (!category) return;
    setShowModal(false);
    edit ? await editCategory() : await createCategory();
  };
  return (
    <ModalBody
      edit={!!edit}
      onSubmit={submitHandler}
      height="h-[200px]"
      title={edit ? 'Edit Kategori' : 'Tambah Ktegori'}
      {...{setShowModal, showModal}}>
      <TextInput
        className="bg-border px-5 py-2 mt-1 mb-1 rounded-full text-accent font-sourceSansProSemiBold text-base"
        placeholderTextColor={colors.placeholder}
        placeholder="Nama Kategori"
        onChangeText={text => setCategory(text)}
        value={category}
      />
    </ModalBody>
  );
};

export default CategoryModal;
