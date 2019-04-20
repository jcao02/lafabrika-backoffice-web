import Vue from 'vue';
import Component from 'vue-class-component';
import { User } from 'lafabrika-resources';

import { Response, RequestOptions } from '@/modules/http';

@Component
export class UserListManager extends Vue {
  /**
   * Request users to API
   * @param options of the request
   */
  getUsers(options?: RequestOptions): Promise<Response<User[]>> {
    const path = '/admin/users';
    return this.$http.get(path, options);
  }

  /**
   * Deletes a user
   * @param id of the user
   * @param options of the request
   */
  deleteUser(id: string, options?: RequestOptions): Promise<Response> {
    const path = `/admin/users/${id}`;
    return this.$http.delete(path, options);
  }
}
