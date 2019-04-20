import Vue from 'vue';
import Component from 'vue-class-component';

import { Response, RequestOptions, Requester, NetworkRequester } from '@/modules/http';

import { User } from '@/modules/shared/classes/resources/user';

@Component
export class UserListManager extends Vue {
  requester: Requester;

  constructor() {
    super();
    this.requester = new NetworkRequester();
  }

  /**
   * Request users to API
   * @param options of the request
   */
  getUsers(options?: RequestOptions): Promise<Response<User[]>> {
    const path = '/admin/users';
    return this.requester.get(path, options);
  }

  /**
   * Deletes a user
   * @param id of the user
   * @param options of the request
   */
  deleteUser(id: string, options?: RequestOptions): Promise<Response> {
    const path = `/admin/users/${id}`;
    return this.requester.delete(path, options);
  }
}
