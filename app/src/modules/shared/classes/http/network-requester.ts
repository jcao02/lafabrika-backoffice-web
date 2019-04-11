import axios from 'axios';

import { Requester } from './requester';
import { Response } from './response';
import { RequestOptions } from './request-options';

export class NetworkRequester implements Requester {

  get<T = any>(path: string, options?: RequestOptions): Promise<Response<T>> {
    return axios.get<T>(path, options);
  }
  post<T = any>(path: string, payload: any, options?: RequestOptions): Promise<Response<T>> {
    return axios.post(path, payload, options);
  }
  patch<T = any>(path: string, payload: any, options?: RequestOptions): Promise<Response<T>> {
    return axios.patch(path, payload, options);
  }
  delete<T = any>(path: string, options?: RequestOptions): Promise<Response<T>> {
    return axios.delete(path, options);
  }

}