import Vue from 'vue';
import Component from 'vue-class-component';
import { User } from 'lafabrika-resources';
import { Omit } from 'lafabrika-helpers';

import { RequestOptions, Response } from '@/modules/http';


@Component
export class UserEditManager extends Vue {
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
    return this.$http.patch(path, payload, options);
  }

  /**
   * Updates a user's password
   * @param id of th user
   * @param payload with new password
   * @param options of the request
   */
  updatePassword(
    id: string,
    payload: { newPassword: string },
    options?: RequestOptions
  ): Promise<Response<void>> {
    const path = `/admin/user-private-informations/${id}`;
    return this.$http.patch(path, payload, options);
  }
}
