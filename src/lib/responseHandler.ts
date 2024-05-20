import {Dispatch, SetStateAction} from 'react';

type ResponseData = {data: {data: any}};
const responseHandler = <T>(
  response: ResponseData,
  callback?: (response: any) => T | void,
) => {
  if (!callback) return response.data.data;
  callback(response.data.data);
};

export default responseHandler;
