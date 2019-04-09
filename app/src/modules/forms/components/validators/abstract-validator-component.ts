import { Prop, Vue } from 'vue-property-decorator';
import { AbstractValidator } from '../../classes/validators/abstract-validator';
import { ErrorMessagesDictionary } from '../../classes/error-messages/error-messages-dictionary';
import { Observable } from '@/modules/shared/classes/observable';
import { Observer } from '@/modules/shared/classes/observer';

/**
 * Represents a component that holds a control
 */
export abstract class AbstractValidatorComponent extends Vue implements Observable {
  static validatorCounter = 0;
  error: boolean = false;
  errorMessages: string[] = [];
  observers: Observer[] = [];
  vid!: number;

  @Prop() validators!: AbstractValidator[];
  @Prop() errorsDictionary!: ErrorMessagesDictionary;

  abstract validate(value: any): void;

  created() {
    this.vid = AbstractValidatorComponent.validatorCounter++;
  }

  subscribe(obs: Observer): void {
    this.observers.push(obs);
  }

  unsubscribe(obs: Observer): void {
    const index = this.observers.indexOf(obs);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    this.observers.forEach((obs: Observer) => {
      obs.update(this);
    });
  }
}
