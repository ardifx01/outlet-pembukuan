import {isAxiosError} from 'axios';
import {APP_ENV} from '@env';
import {Alert} from 'react-native';

export class ResponseError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const ErrorHandler = (error: any) => {
  if (isAxiosError(error)) {
    const error_message = error.response?.data.error || error.message;
    const error_code = error.response?.status || (error.status as number);
    console.log(error_message, error.request._url);
    if (
      !error_code ||
      error_code == 401 ||
      error_code == 404 ||
      error_code == 426
    )
      return {error_code, error_message};
    else
      return APP_ENV == 'local'
        ? Alert.alert('Error ' + error_code, error_message + ' in debug')
        : Alert.alert('Error', error_message);
  } else {
    return APP_ENV == 'local'
      ? Alert.alert('Error', error + ' in debug')
      : Alert.alert('Error', 'Internal Error');
  }
};
