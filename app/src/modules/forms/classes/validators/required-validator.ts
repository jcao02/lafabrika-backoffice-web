import { AbstractValidator } from './abstract-validator';
import { RequiredValidationError } from '../errors/required-validation-error';

export class RequiredValidator implements AbstractValidator {

  validate(value: any): RequiredValidationError | null {
    return value === '' || value === null || value === undefined ? new RequiredValidationError() : null;
  }
}
