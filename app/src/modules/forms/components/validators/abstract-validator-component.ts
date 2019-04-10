import { Prop, Vue, Component, Inject, Provide } from 'vue-property-decorator';
import { AbstractValidator } from '../../classes/validators/abstract-validator';
import { ErrorMessagesDictionary } from '../../classes/error-messages/error-messages-dictionary';
import { Observable } from '@/modules/shared/classes/observable';
import { Observer } from '@/modules/shared/classes/observer';
import { ControlState } from '../../classes/controls/control-state';

/**
 * Represents a component that validates inner controls
 */
// @ts-ignore
@Component
export abstract class AbstractValidatorComponent extends Vue implements Observable, Observer {
  static validatorCounter = 0;
  error: boolean = false;
  errorMessages: string[] = [];
  observers: Observer[] = [];
  vid!: number;
  innerValue: any;
  controlState: ControlState | null = null;

  @Prop() validators!: AbstractValidator[];
  @Prop() errorsDictionary!: ErrorMessagesDictionary;
  @Inject({ default: null }) readonly vObserver!: Observer | null;
  @Provide() iObserver: Observer = this;

  abstract validate(value: any): void;

  created() {
    this.vid = AbstractValidatorComponent.validatorCounter++;
    if (this.vObserver) {
      this.subscribe(this.vObserver);
    }
  }

  destroyed() {
    if (this.vObserver) {
      this.unsubscribe(this.vObserver);
    }
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

  update(value: ControlState): void {
    this.controlState = value;
  }
}
