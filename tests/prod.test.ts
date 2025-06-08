import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {sleep} from '../src/lib/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {BASE_URL} from '@env';
import {jwtDecode} from 'jwt-decode';

dayjs.extend(utc);
dayjs.extend(timezone);
const version = '1.0.0';
const tz = dayjs.tz.guess();
const http = axios.create({
  baseURL: BASE_URL,
  headers: {'x-client-version': version, 'x-client-timezone': tz},
});
const isAccessTokenExpired = (access_token: string) => {
  const value = jwtDecode(access_token);
  return Date.now() >= value.exp! * 1000;
};
let access_token_data: string = '';

const getRefreshToken = (): Promise<string> => {
  sleep(1000);
  return Promise.resolve(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDRmMzVjMWQzOGQxYjlmOTg4NzQwMSIsInVzZXJuYW1lIjoiQWwgRmF6emEiLCJlbWFpbCI6Imt1YmlrNTAyMkBnbWFpbC5jb20iLCJpYXQiOjE3NDkzODMwOTh9.k4pebhW3_FuNYIG9lvpA6U7niFRNPQU2i9RsNortt8I',
  );
};

const getAccessToken = (): Promise<string> => {
  sleep(1000);
  return Promise.resolve(access_token_data);
};

const silentRefreshToken = async (
  refresh_token: string,
): Promise<string | null> => {
  try {
    const res = await axios.post(BASE_URL + '/api/token', {
      token: refresh_token,
    });
    return res.data.data.access_token;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

type customConfig = InternalAxiosRequestConfig & {_retry: boolean};

http.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig | any> => {
    const access_token = await getAccessToken();
    if (!access_token || isAccessTokenExpired(access_token)) {
      try {
        const refreshToken = (await getRefreshToken()) as string;
        const newToken = (await silentRefreshToken(refreshToken)) as string;
        access_token_data = newToken;
        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (error: any) {
        const status = error.response?.status || error.status;
        if (status == 401) {
          // setIsLoading(false);
          // logout();
          // sessionExp();
          console.log('unauthorized() logout() sessionexp()');
          return Promise.reject(error);
        }
        if (!status) {
          // networkError();
          console.log('networkError()');
          return Promise.reject(error);
        }
      }
    } else {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    console.log('header : ', config.headers);
    console.log('req: ', config.url);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
http.interceptors.response.use(
  (response: AxiosResponse<{data: any}>) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: customConfig = {
      ...error.config,
      _retry: false,
    } as customConfig;
    console.log('retry_', originalRequest._retry);
    console.log('req.headers', originalRequest.headers);
    if (error.status == 401 && !originalRequest._retry) {
      // if (false) {
      originalRequest._retry = true;
      const refreshToken = await getRefreshToken();
      try {
        const newToken = await silentRefreshToken(refreshToken!);
        access_token_data = newToken!;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        await http(originalRequest);
      } catch (error: any) {
        const status = error.response?.status || error.status;
        if (status == 401) {
          // setIsLoading(false);
          // logout();
          // sessionExp();
          console.log('unauthorized() logout() sessionexp()');
          return Promise.reject(error);
        }
        if (!status) {
          // networkError();
          console.log('networkError()');
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

describe('test production', () => {
  it('should get transaction', async () => {
    try {
      // for (let i = 0; i < 10; i++) {
      const resTrx = await http.get('/api/transaction');
      console.log(resTrx.data);
      // }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
    }
  }, 100000);
  it('should get debt', async () => {
    try {
      // for (let i = 0; i < 10; i++) {
      const resDebt = await http.get('/api/debt');
      console.log(resDebt.data);
      // }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
    }
  }, 100000);
  it('should get receivable', async () => {
    try {
      // for (let i = 0; i < 10; i++) {
      const res = await http.get('/api/receivable');
      console.log(res.data);
      // }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
    }
  }, 100000);
});
