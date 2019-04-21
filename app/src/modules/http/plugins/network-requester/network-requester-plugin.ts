import _Vue, { PluginObject } from 'vue';
import { NetworkRequesterPluginOptions } from './network-requester-plugin-options';

function install(vue: typeof _Vue, options?: NetworkRequesterPluginOptions) {
  if (!options || !( 'Requester' in options )) {
    throw new Error('Requester class must be provided');
  } else {
    vue.prototype.$http = new options.Requester();
  }
}

export const NetworkRequesterPlugin: PluginObject<NetworkRequesterPluginOptions> = { install };
