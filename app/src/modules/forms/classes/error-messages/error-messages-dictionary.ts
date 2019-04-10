import { ValidatorName } from '../validators/validator-names';

export interface ErrorMessagesDictionary extends Record<ValidatorName, string> {
  default: string;
}
