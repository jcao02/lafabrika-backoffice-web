import _Vue, { PluginObject } from 'vue';
import { NetworkRequesterPluginOptions } from './network-requester-plugin-options';
import { NetworkRequester } from '../../classes';

function install(vue: typeof _Vue, options?: NetworkRequesterPluginOptions) {
  vue.prototype.$http = new NetworkRequester();
}

export const NetworkRequesterPlugin: PluginObject<NetworkRequesterPluginOptions> = { install };
