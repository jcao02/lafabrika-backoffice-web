import { AbstractValidationError } from '../errors/validation-error';

/**
 * Interface to validate a value
 */
export interface AbstractValidator {
  /**
   * Returns an AbstractValidationError if there is an error with
   * the value, or null otherwise
   * @param value to be validated
   */
  validate(value: any): AbstractValidationError | null;
}
