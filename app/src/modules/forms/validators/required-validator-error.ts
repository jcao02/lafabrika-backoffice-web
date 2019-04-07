import { AbstractValidationError } from '../interfaces/validation-error';

export class RequiredValidationError implements AbstractValidationError {
  readonly name = 'required';
}
