import Vue from 'vue';
import { Requester } from '@/modules/http';

declare module 'vue/types/vue' {
  interface Vue {
    $http: Requester;
  }
}
