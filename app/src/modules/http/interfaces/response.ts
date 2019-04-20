/**
 * Represents a response from an HTTP call
 */
export interface Response<T = any> {
  data: T;
  status: number;
}
