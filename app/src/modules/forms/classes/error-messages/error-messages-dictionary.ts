import { ValidatorName } from '../validators/validator-names';

export interface ErrorMessagesDictionary extends Record<ValidatorName, string | ((...args: any) => string)> {
  default: string;
}
