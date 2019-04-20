import Vue from 'vue';
import Component from 'vue-class-component';
import { Authentication } from '@/modules/shared/classes/resources/authentication';
import { RequestOptions, Requester, Response, NetworkRequester } from '@/modules/http';

import { AuthenticationManager } from '../classes/authentication-manager';
import { AuthenticationPayload } from '../classes/authentication-payload';

@Component
export class TokenAuthenticationManager extends Vue implements AuthenticationManager {
  requester: Requester;

  constructor() {
    super();
    this.requester = new NetworkRequester();
  }

  authenticate(payload: AuthenticationPayload, options?: RequestOptions): Promise<Response<Authentication>> {
    const path = `/sign-in`;
    return this.requester.post<Authentication>(path, payload, options);
  }
}
