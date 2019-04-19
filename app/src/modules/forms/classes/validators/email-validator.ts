import { AbstractValidator } from './abstract-validator';
import { EmailValidationError } from '../errors';
import { ValidatorName } from './validator-names';

export class EmailValidator implements AbstractValidator {
  readonly name = ValidatorName.EMAIL;

  validate(value: any): EmailValidationError | null {
    // tslint:disable-next-line: max-line-length
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !emailRegex.test(value) ? new EmailValidationError() : null ;
  }
}
