import Vue from 'vue';
import Component from 'vue-class-component';
import { User } from 'lafabrika-resources';

import { RequestOptions, Response, Requester, NetworkRequester } from '@/modules/http';

import { Omit } from '@/modules/shared';

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
