import Vue from 'vue';
import Component from 'vue-class-component';

import { Response } from '@/modules/shared/classes/http/response';
import { RequestOptions } from '@/modules/shared/classes/http/request-options';
import { Requester } from '@/modules/shared/classes/http/requester';
import { NetworkRequester } from '@/modules/shared/classes/http/network-requester';

import { Omit } from '@/modules/shared';
import { User } from '@/modules/shared/classes/resources/user';

@Component
export class UserEditManager extends Vue {
  requester: Requester;

  constructor() {
    super();
    this.requester = new NetworkRequester();
  }

  /**
   * Updates a user
   * @param id of the user
   * @param payload to be sent
   * @param options of the request
   */
  updateUser(
    id: string,
    payload: Omit<User, 'id'>,
    options?: RequestOptions
  ): Promise<Response<User>> {
    const path = `/admin/users/${id}`;
    return this.requester.patch(path, payload, options);
  }
}
