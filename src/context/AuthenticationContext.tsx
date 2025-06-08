import React, {
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
  getRefreshToken,
  isAccessTokenExpired,
  removeAccessToken,
  removeRefreshToken,
  storingAccessToken,
  storingRefreshToken,
} from '../lib/token';
import axios, {isAxiosError} from 'axios';
import {BASE_URL} from '@env';
import http, {httpd} from '../lib/axios';

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

type registerCredential = {
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
  register: (credential: registerCredential) => Promise<void>;
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

  const register = async (credential: registerCredential): Promise<void> => {
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
