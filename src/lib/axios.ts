import axios from 'axios';
import versionNumber from 'react-native-version-number';
import {BASE_URL, DEV_URL} from '@env';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
const version = versionNumber.appVersion;
const tz = dayjs.tz.guess();
const http = axios.create({
  baseURL: BASE_URL,
  headers: {'x-client-version': version, 'x-client-timezone': tz},
});
const httpd = axios.create({
  baseURL: DEV_URL,
  headers: {'x-client-version': version},
});

export {httpd};
export default http;
