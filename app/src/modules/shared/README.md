# Shared Module

This module contains shared components, mixins and classes to be used in other modules.

## Classes

### Http

- Requester: interface to make remote requests using HTTP methods.
- Response: interface that defines a request response.
- RequestOptions: interface that defines a request options.
- NetworkRequester: class that implements `Requester` for network requests. It uses `axios` to perform the requests.

### Observables

- Observable: interface that defines an observable pattern.
- Observer: interface that defines an observer pattern.
