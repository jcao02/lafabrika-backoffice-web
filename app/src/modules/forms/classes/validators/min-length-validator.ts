import { AbstractValidator } from './abstract-validator';
import { MinLengthValidationError } from '../errors';
import { ValidatorName } from './validator-names';

export class MinLengthValidator implements AbstractValidator {
  readonly name = ValidatorName.MINLENGTH;
  length: number;

  constructor(length: number) { this.length = length; }

  validate(value: any): MinLengthValidationError | null {
    return !value || value.length < this.length ? new MinLengthValidationError(this.length) : null;
  }
}
