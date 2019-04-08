import { AbstractValidationError } from './validation-error';
import { ValidationErrorName } from './error-names';

export class RequiredValidationError implements AbstractValidationError {
  readonly name = ValidationErrorName.REQUIRED;
}
