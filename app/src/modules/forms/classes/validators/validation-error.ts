/**
 * Represents a validation error containing at least the
 * field name
 */
export interface AbstractValidationError {
  readonly name: string;
}
