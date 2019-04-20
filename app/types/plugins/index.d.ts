import Vue from 'vue';
import { NetworkRequester } from '../../src/modules/http/classes/network-requester';

declare module 'vue/types/vue' {
  interface Vue {
    $http: NetworkRequester;
  }
}
