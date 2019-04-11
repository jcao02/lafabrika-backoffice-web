import Vue from 'vue';
import axios from 'axios';

import { Requester } from '../classes/http/requester';
import { Response } from '../classes/http/response';
import { Component } from 'vue-property-decorator';
import { RequestOptions } from '../classes/http/request-options';

@Component
export default class NetworkRequester extends Vue implements Requester {

  get<T = any>(url: string, options?: RequestOptions): Promise<Response<T>> {
    return axios.get<T>(url, options);
  }
  post<T = any>(url: string, payload: any, options?: RequestOptions): Promise<Response<T>> {
    return axios.post(url, payload, options);
  }
  patch<T = any>(url: string, payload: any, options?: RequestOptions): Promise<Response<T>> {
    return axios.patch(url, payload, options);
  }
  delete<T = any>(url: string, options?: RequestOptions): Promise<Response<T>> {
    return axios.delete(url, options);
  }

}
