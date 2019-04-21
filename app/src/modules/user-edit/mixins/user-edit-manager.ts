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
}
