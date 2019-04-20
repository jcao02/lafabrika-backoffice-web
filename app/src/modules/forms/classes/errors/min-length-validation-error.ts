import { AbstractValidationError } from './validation-error';
import { ValidatorName } from '../validators/validator-names';

export class MinLengthValidationError implements AbstractValidationError {
  readonly name = ValidatorName.MINLENGTH;
  args: any[];

  constructor(length: number) {
    this.args = [length];
  }
}
