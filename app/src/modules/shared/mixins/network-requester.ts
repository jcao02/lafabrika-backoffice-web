import Vue from 'vue';
import { Requester } from '../classes/requester';
import { Component } from 'vue-property-decorator';

@Component
export default class NetworkRequester extends Vue implements Requester {

  get<T = any>(url: string): Promise<T> {
  }
  post<T = any>(url: string, payload: any): Promise<T> {
  }
  patch<T = any>(url: string, payload: any): Promise<T> {
  }
  delete<T = any>(url: string): Promise<T> {
  }

}
