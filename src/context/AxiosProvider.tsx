import sessionExp from '../components/popup/sessionExp';
import networkError from '../components/popup/networkError';
import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import http from '../lib/axios';
import {
  getAccessToken,
  getRefreshToken,
  isAccessTokenExpired,
  silentRefreshToken,
  storingAccessToken,
} from '../lib/token';
import {ReactNode, useContext} from 'react';
import {AuthContext, initAuthContext} from './AuthenticationContext';
export const AxiosProvider = ({children}: {children: ReactNode}) => {
  const {setIsLoading, logout} = useContext(AuthContext) as initAuthContext;

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
  return children;
};
