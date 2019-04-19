import Vue from 'vue';
import Component from 'vue-class-component';

import { Response } from '@/modules/shared/classes/http/response';
import { RequestOptions } from '@/modules/shared/classes/http/request-options';
import { Requester } from '@/modules/shared/classes/http/requester';
import { NetworkRequester } from '@/modules/shared/classes/http/network-requester';

import { Omit } from '@/modules/shared';
import { User } from '@/modules/shared/classes/resources/user';

@Component
export class UserNewManager extends Vue {
  requester: Requester;

  constructor() {
    super();
    this.requester = new NetworkRequester();
  }

  /**
   * Request users to API
   * @param options of the request
   */
  createUser(payload: Omit<User, 'id'> & { password: string; }, options?: RequestOptions): Promise<Response<User>> {
    const path = '/admin/users';
    return this.requester.post(path, payload, options);
  }
}
