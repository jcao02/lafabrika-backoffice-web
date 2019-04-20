import { Authentication } from '@/modules/shared/classes/resources/authentication';
import { RequestOptions, Response } from '@/modules/http';
import { AuthenticationPayload } from './authentication-payload';

export interface AuthenticationManager {
  authenticate(payload: AuthenticationPayload, options?: RequestOptions): Promise<Response<Authentication>>;
}
