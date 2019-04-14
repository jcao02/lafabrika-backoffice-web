import { AbstractValidationError } from '../errors/validation-error';
import { ValidatorName } from './validator-names';

/**
 * Interface to validate a value
 */
export interface AbstractValidator {
  readonly name: ValidatorName;

  /**
   * Returns an AbstractValidationError if there is an error with
   * the value, or null otherwise
   * @param value to be validated
   */
  validate(value: any): AbstractValidationError | null;
}
