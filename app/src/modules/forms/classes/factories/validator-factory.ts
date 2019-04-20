import {
  AbstractValidator,
  RequiredValidator,
  EmailValidator,
  MinLengthValidator,
  MatchValueValidator,
  ValidatorName
} from '../validators';

export class ValidatorFactory {
  static createValidator(type: ValidatorName, ...args: any): AbstractValidator {
    switch (type) {
      case ValidatorName.REQUIRED:
        return new RequiredValidator();
      case ValidatorName.EMAIL:
        return new EmailValidator();
      case ValidatorName.MINLENGTH:
        return new MinLengthValidator(args);
      case ValidatorName.MATCHVALUE:
        return new MatchValueValidator(args);
      default:
        throw new Error(`Invalid type ${type}`);
    }
  }
}
