import { AbstractValidator } from '../validators/abstract-validator';
import { RequiredValidator } from '../validators/required-validator';

export class ValidatorFactory {
  static createValidator(type: string): AbstractValidator {
    switch (type) {
      case 'required':
      default:
        return new RequiredValidator();
    }
  }
}
