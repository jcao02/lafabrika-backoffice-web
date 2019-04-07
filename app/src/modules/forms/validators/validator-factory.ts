import { AbstractValidator } from '../interfaces/abstract-validator';
import { RequiredValidator } from './required-validator';

export class ValidatorFactory {
  static createValidator(type: string): AbstractValidator {
    switch (type) {
      case 'required':
      default:
        return new RequiredValidator();
    }
  }
}
