import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {jwtDecode} from 'jwt-decode';
import 'core-js/stable/atob';
import axios, {isAxiosError} from 'axios';
import {BASE_URL} from '@env';

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

const storingAccessToken = async (access_token: string) => {
  await AsyncStorage.setItem('access_token', access_token);
};

const storingRefreshToken = async (refresh_token: string) => {
  await EncryptedStorage.setItem('refresh_token', refresh_token);
};
const getAccessToken = async () => {
  return AsyncStorage.getItem('access_token');
};

const getRefreshToken = async () => {
  return await EncryptedStorage.getItem('refresh_token');
};

const isAccessTokenExpired = (access_token: string) => {
  const value = jwtDecode(access_token);
  return Date.now() >= value.exp! * 1000;
};

const removeAccessToken = () => {
  AsyncStorage.removeItem('access_token');
};
const removeRefreshToken = () => {
  EncryptedStorage.removeItem('refresh_token');
};

export {
  getAccessToken,
  getRefreshToken,
  isAccessTokenExpired,
  storingAccessToken,
  storingRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  silentRefreshToken,
};
