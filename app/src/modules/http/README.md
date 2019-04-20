# HTTP Module

This module contains everything related to HTTP network requests.

## Interfaces

### Requester
Interface for remote requester objects using HTTP methods
  - `get<T = any>(path: string, options?: RequestOptions): Promise<Response<T>>`: makes HTTP `GET` request.
  - `post<T = any>(path: string, payload: any, options?: RequestOptions): Promise<Response<T>>`: makes HTTP `POST` request.
  - `patch<T = any>(path: string, payload: any, options?: RequestOptions): Promise<Response<T>>`: makes HTTP `PATCH` request.
  - `delete<T = any>(path: string, options?: RequestOptions): Promise<Response<T>>`: makes HTTP `DELETE` request.

  The `T` generic type depends on the data from the server response.

### RequestOptions
Object that represents options to be set in the request:
  - **headers (Optional)**: key-value object set to the request headers.
  - **baseURL (Optional)**: string that represents the request base-url (defaults to host).
  - **params (Optional)**: key-value object set as the request query-parameters (they'll be translated into `key1=value1&key2=value2`)

This is usually used within a `Requester` methods.

### Response
Object that represents a response from an HTTP call:
  - **data**: object of type `T` representing the response body;
  - **status**: number representing the HTTP statu code;

This is the result from the `Requester` http methods.

### ResponseError
Object that represents a response error, i.e, different from `2xx`:
  - code: string that represents the status code.
  - response: Response<T> that represents the server response.


## Classes

### NetworkRequester
Class that implements `Requester` interface and makes HTTP network requests using [axios](https://github.com/axios/axios) library
