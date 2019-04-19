import { AbstractValidator, RequiredValidator, ValidatorName, EmailValidator } from '../validators';

export class ValidatorFactory {
  static createValidator(type: ValidatorName): AbstractValidator {
    switch (type) {
      case ValidatorName.REQUIRED:
        return new RequiredValidator();
      case ValidatorName.EMAIL:
        return new EmailValidator();
      default:
        throw new Error(`Invalid type ${type}`);
    }
  }
}
