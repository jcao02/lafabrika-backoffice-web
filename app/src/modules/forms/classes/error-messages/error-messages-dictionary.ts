import { ValidationErrorName } from '../errors/error-names';

export interface ErrorMessagesDictionary extends Record<ValidationErrorName, string> {
  default: string;
}
