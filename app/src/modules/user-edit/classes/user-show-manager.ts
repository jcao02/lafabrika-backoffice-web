import Vue from 'vue';
import Component from 'vue-class-component';

import { Response } from '@/modules/shared/classes/http/response';
import { RequestOptions } from '@/modules/shared/classes/http/request-options';
import { Requester } from '@/modules/shared/classes/http/requester';
import { NetworkRequester } from '@/modules/shared/classes/http/network-requester';

import { User } from '@/modules/shared/classes/resources/user';

@Component
export class UserShowManager extends Vue {
  /**
   * Gets a user
   * @param id of the user
   * @param options of the request
   */
  static getUser(id: string, options?: RequestOptions): Promise<Response<User>> {
    const path = `/admin/users/${id}`;
    const requester = new NetworkRequester();
    return requester.get(path, options);
  }
}
