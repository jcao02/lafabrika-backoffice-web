import { AbstractValidationError } from './validation-error';
import { ValidatorName } from '../validators/validator-names';

export class EmailValidationError implements AbstractValidationError {
  readonly name = ValidatorName.EMAIL;
}
