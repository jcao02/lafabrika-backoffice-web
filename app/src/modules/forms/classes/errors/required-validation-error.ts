import { AbstractValidationError } from './validation-error';
import { ValidatorName } from '../validators/validator-names';

export class RequiredValidationError implements AbstractValidationError {
  readonly name = ValidatorName.REQUIRED;
}
