import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Loading from '../components/loading';
import {Alert} from 'react-native';
import {
  getAccessToken,
  getRefreshToken,
  isAccessTokenExpired,
  removeAccessToken,
  removeRefreshToken,
  silentRefreshToken,
  storingAccessToken,
  storingRefreshToken,
} from '../lib/token';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import {BASE_URL} from '@env';
import http from '../lib/axios';
import sessionExp from '../components/popup/sessionExp';
import networkError from '../components/popup/networkError';
import AsyncStorage from '@react-native-async-storage/async-storage';

type crendential = {
  email: string;
  password: string;
};

export type userLogin = {
  username: string;
  access_token: string;
  refresh_token: string;
};

type registerCrendential = {
  username: string;
  otp: string;
} & crendential;

export type initAuthContext = {
  isLoading: boolean;
  userToken: string;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  login: (credential: crendential) => Promise<void>;
  logout: () => Promise<void>;
  register: (credential: registerCrendential) => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const req = axios.create({baseURL: BASE_URL});
req.interceptors.response.use(
  response => {
    return {...response, data: response.data.data};
  },
  error => Promise.reject(error),
);

export const AuthContext = createContext<initAuthContext | null>(null);
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>('');
  const [error, setError] = useState<string>('');

  const login = async (credential: crendential): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req({
        method: 'POST',
        url: `/api/user/login`,
        data: credential,
      });
      const access_token = res.data.access_token;
      const refresh_token = res.data.refresh_token;
      setUserToken(access_token);
      await storingAccessToken(access_token);
      await storingRefreshToken(refresh_token);
    } catch (error: any) {
      if (isAxiosError(error)) {
        const error_message = error.response?.data.error || error.message;
        setError(error_message);
        // console.log(error);
      } else {
        setError('Ooops!, Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const refresh_token = await getRefreshToken();
      if (!isAccessTokenExpired(userToken) && refresh_token) {
        console.log('logout http');
        await http.delete('/api/user/logout', {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        });
      }

      removeAccessToken();
      removeRefreshToken();
      setUserToken('');
      setIsLoading(false);
    } catch (error: any) {
      console.log('logout error');
      if (error.message == 'Network Error') {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Sesi Habis', 'Silahkan login kembali');
        removeAccessToken();
        removeRefreshToken();
        setUserToken('');
      }

      setIsLoading(false);
    }
  };

  const register = async (credential: registerCrendential): Promise<void> => {
    await req({
      url: 'api/user/register',
      method: 'POST',
      data: credential,
    });
  };

  const isLoggedIn = useCallback(async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem('access_token');
      setUserToken(userToken!);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
    }
  }, [userToken]);

  // Interceptor Axios

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
          storingAccessToken(newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (error: any) {
          const status = error.response?.status || error.status;
          if (status == 401) {
            setIsLoading(false);
            logout();
            sessionExp();
            return Promise.reject(error);
          }
          if (!status) {
            networkError();
            return Promise.reject(error);
          }
        }
      } else {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
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
      if (error.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = await getRefreshToken();
        try {
          const newToken = await silentRefreshToken(refreshToken!);
          storingAccessToken(newToken!);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          await http(originalRequest);
        } catch (error: any) {
          const status = error.response?.status || error.status;
          if (status == 401) {
            setIsLoading(false);
            logout();
            sessionExp();
            return Promise.reject(error);
          }
          if (!status) {
            networkError();
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    setError('');
    isLoggedIn();
  }, [isLoggedIn]);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        login,
        logout,
        register,
        error,
        setError,
        setIsLoading,
      }}>
      {children}
      {isLoading && <Loading />}
    </AuthContext.Provider>
  );
};
