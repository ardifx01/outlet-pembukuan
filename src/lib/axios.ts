import axios from 'axios';
import versionNumber from 'react-native-version-number';
import {BASE_URL, DEV_URL} from '@env';

const version = versionNumber.appVersion;
const http = axios.create({
  baseURL: BASE_URL,
  headers: {'x-client-version': version},
});
const httpd = axios.create({
  baseURL: DEV_URL,
  headers: {'x-client-version': version},
});

export {httpd};
export default http;
