import axios from 'axios';

import { Requester } from '../interfaces/requester';
import { Response } from '../interfaces/response';
import { RequestOptions } from '../interfaces/request-options';

export class NetworkRequester implements Requester {

  get<T = any>(path: string, options?: RequestOptions): Promise<Response<T>> {
    return axios.get<T>(path, { ...options, withCredentials: true });
  }
  post<T = any>(path: string, payload: any, options?: RequestOptions): Promise<Response<T>> {
    return axios.post(path, payload, { ...options, withCredentials: true });
  }
  patch<T = any>(path: string, payload: any, options?: RequestOptions): Promise<Response<T>> {
    return axios.patch(path, payload, { ...options, withCredentials: true });
  }
  delete<T = any>(path: string, options?: RequestOptions): Promise<Response<T>> {
    return axios.delete(path, { ...options, withCredentials: true });
  }

}
