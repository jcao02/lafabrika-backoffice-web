import { AbstractValidationError } from './validation-error';
import { ValidatorName } from '../validators/validator-names';

export class MatchValueValidationError implements AbstractValidationError {
  readonly name = ValidatorName.MATCHVALUE;
}
