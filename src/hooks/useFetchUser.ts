import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {AuthContext, initAuthContext} from '../context/AuthenticationContext';
import http from '../lib/axios';
import responseHandler from '../lib/responseHandler';
import {ErrorHandler} from '../lib/Error';

const useFetchUser = (
  setUser: Dispatch<SetStateAction<{username: string; email: string}>>,
) => {
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;
  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await http.get('/api/user/current');
      responseHandler(res, data => {
        setUser(data);
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
};

export default useFetchUser;
