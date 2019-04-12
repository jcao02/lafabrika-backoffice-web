import { Response } from './response';
import { RequestOptions } from './request-options';
/**
 * Interface for remote requester objects using HTTP methods
 */
export interface Requester {
  get<T = any>(path: string, options?: RequestOptions): Promise<Response<T>>;
  post<T = any>(path: string, payload: any, options?: RequestOptions): Promise<Response<T>>;
  patch<T = any>(path: string, payload: any, options?: RequestOptions): Promise<Response<T>>;
  delete<T = any>(path: string, options?: RequestOptions): Promise<Response<T>>;
}
