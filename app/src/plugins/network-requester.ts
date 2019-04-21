import Vue from 'vue';
import { NetworkRequesterPlugin, NetworkRequester } from '@/modules/http';

Vue.use(NetworkRequesterPlugin, {
  Requester: NetworkRequester
});
