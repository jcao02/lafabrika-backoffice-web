import { AbstractValidator } from '../validators/abstract-validator';
import { RequiredValidator } from '../validators/required-validator';
import { ValidatorName } from '../validators/validator-names';

export class ValidatorFactory {
  static createValidator(type: ValidatorName): AbstractValidator {
    switch (type) {
      case ValidatorName.REQUIRED:
      default:
        return new RequiredValidator();
    }
  }
}
