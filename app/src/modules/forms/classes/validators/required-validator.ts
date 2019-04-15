import { AbstractValidator } from './abstract-validator';
import { RequiredValidationError } from '../errors';
import { ValidatorName } from './validator-names';

export class RequiredValidator implements AbstractValidator {
  readonly name = ValidatorName.REQUIRED;

  validate(value: any): RequiredValidationError | null {
    return value === '' || value === null || value === undefined ? new RequiredValidationError() : null;
  }
}
