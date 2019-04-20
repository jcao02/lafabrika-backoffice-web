import { ValidatorName } from '../validators/validator-names';

/**
 * Represents a validation error containing at least the
 * field name
 */
export interface AbstractValidationError {
  readonly name: ValidatorName;
  args?: any[];
}
