import { Response } from './response';

/**
 * Represents a response error
 */
export interface ResponseError<T = any> extends Error {
  code?: string;
  response?: Response<T>;
}
