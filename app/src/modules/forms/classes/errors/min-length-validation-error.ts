import { AbstractValidationError } from './validation-error';
import { ValidatorName } from '../validators/validator-names';

export class MinLengthValidationError implements AbstractValidationError {
  readonly name = ValidatorName.MINLENGTH;
  length: number;

  constructor(length: number) {
    this.length = length;
  }
}
