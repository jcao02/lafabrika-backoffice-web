import Vue from 'vue';
import Component from 'vue-class-component';
import { Authentication } from 'lafabrika-resources';

import { RequestOptions, Requester, Response, NetworkRequester } from '@/modules/http';

import { AuthenticationManager } from '../classes/authentication-manager';
import { AuthenticationPayload } from '../classes/authentication-payload';

@Component
export class TokenAuthenticationManager extends Vue implements AuthenticationManager {
  /**
   * Authenticates a email-password combination
   * @param payload to send
   * @param options to set in th request
   */
  authenticate(payload: AuthenticationPayload, options?: RequestOptions): Promise<Response<Authentication>> {
    const path = `/sign-in`;
    return this.$http.post<Authentication>(path, payload, options);
  }
}
