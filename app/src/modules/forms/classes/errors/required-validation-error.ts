import { AbstractValidationError } from './validation-error';

export class RequiredValidationError implements AbstractValidationError {
  readonly name = 'required';
}
