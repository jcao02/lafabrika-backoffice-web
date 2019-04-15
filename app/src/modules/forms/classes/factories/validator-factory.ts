import { AbstractValidator, RequiredValidator, ValidatorName } from '../validators';

export class ValidatorFactory {
  static createValidator(type: ValidatorName): AbstractValidator {
    switch (type) {
      case ValidatorName.REQUIRED:
      default:
        return new RequiredValidator();
    }
  }
}
