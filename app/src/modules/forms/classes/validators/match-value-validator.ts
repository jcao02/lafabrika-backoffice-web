import { AbstractValidator } from './abstract-validator';
import { MatchValueValidationError } from '../errors';
import { ValidatorName } from './validator-names';

export class MatchValueValidator implements AbstractValidator {
  readonly name = ValidatorName.MATCHVALUE;
  value: string;

  constructor(value: any) {
    this.value = `${value}`;
  }

  validate(value: any): MatchValueValidationError | null {
    return this.value !== value ? new MatchValueValidationError() : null;
  }
}
