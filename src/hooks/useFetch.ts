import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import http from '../lib/axios';
import responseHandler from '../lib/responseHandler';
import {ErrorHandler} from '../lib/Error';

export default function useFetch<T>({
  url,
  setRefreshing,
  search = null,
  time = null,
  type = null,
  category = null,
  paid = null,
}: {
  url: string;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  search?: string | null;
  time?: string[] | null;
  category?: [] | null;
  paid?: boolean | null;
  type?: string | null;
}) {
  const [data, setData] = useState<T[] | null>(null);

  const fetchProduct = useCallback(async () => {
    let newTime: [string, string] | null = null;
    if (time) newTime = [time[0], time[1]];
    setRefreshing(true);
    try {
      const res = await http.get(url, {
        params: {
          search,
          time: newTime,
          category,
          paid,
          type,
        },
      });
      const data = responseHandler(res);
      setData(data);
    } catch (error: any) {
      if (error.response && error.response.status == 404) setData(null);
      ErrorHandler(error);
    } finally {
      setRefreshing(false);
    }
  }, [search, time, category, paid, type]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  // useEffect(() => {
  //   console.log(search, time, category, paid, type);
  // }, [search, time, category, paid, type]);

  return {data, refresh: fetchProduct};
}
