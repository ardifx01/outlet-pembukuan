import {useCallback, useContext, useEffect, useState} from 'react';
import http from '../lib/axios';
import responseHandler from '../lib/responseHandler';
import {ErrorHandler} from '../lib/Error';
import {AuthContext, initAuthContext} from '../context/AuthenticationContext';

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T[] | null>(null);
  const {setIsLoading} = useContext(AuthContext) as initAuthContext;

  const fetchProduct = useCallback(async () => {
    try {
      const res = await http.get(url);
      const data = responseHandler(res);
      setData(data);
    } catch (error) {
      ErrorHandler(error);
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetchProduct();
    setIsLoading(false);
  }, [fetchProduct]);

  return {data, refresh: fetchProduct};
}
