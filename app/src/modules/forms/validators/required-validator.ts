import { AbstractValidator } from '../interfaces/abstract-validator';
import { RequiredValidationError } from './required-validation-error';

export class RequiredValidator implements AbstractValidator {

  validate(value: any): RequiredValidationError | null {
    return value === '' || value === null || value === undefined ? new RequiredValidationError() : null;
  }
}
