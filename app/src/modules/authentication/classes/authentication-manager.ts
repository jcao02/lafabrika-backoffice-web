import { Response } from '@/modules/shared/classes/http/response';
import { Authentication } from '@/modules/shared/classes/resources/authentication';
import { RequestOptions } from '@/modules/shared/classes/http/request-options';
import { AuthenticationPayload } from './authentication-payload';

export interface AuthenticationManager {
  authenticate(payload: AuthenticationPayload, options?: RequestOptions): Promise<Response<Authentication>>;
}
