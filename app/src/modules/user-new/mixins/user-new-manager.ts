import Vue from 'vue';
import Component from 'vue-class-component';
import { User } from 'lafabrika-resources';

import { RequestOptions, Requester, Response, NetworkRequester } from '@/modules/http';

import { Omit } from '@/modules/shared';

@Component
export class UserNewManager extends Vue {
  requester: Requester;

  constructor() {
    super();
    this.requester = new NetworkRequester();
  }

  /**
   * Creates a user
   * @param payload to be sent
   * @param options of the request
   */
  createUser(payload: Omit<User, 'id'> & { password: string; }, options?: RequestOptions): Promise<Response<User>> {
    const path = '/admin/users';
    return this.requester.post(path, payload, options);
  }
}
