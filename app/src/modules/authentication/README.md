# Authentication Module

This module contains everything related to user authentication

## View
  - Authentication: renders the sign-in view.
## Components
  - AuthenticationForm: renders the sign-in form. It uses the `TokenAuthenticationManager` mixin
## Mixins
  - TokenAuthenticationManager: Handles network requests using JWT token authentication.
## Classes
  - AuthenticationManager: interface that implements `authenticate` method.
  - AuthnticationPayload: interface that defines the payload for authentication.
