import { AbstractValidator } from '../interfaces/abstract-validator';
import { RequiredValidationError } from './required-validator-error';

export class RequiredValidator implements AbstractValidator {

  validate(value: any): RequiredValidationError | null {
    return value === '' || value === null ? new RequiredValidationError() : null;
  }
}
