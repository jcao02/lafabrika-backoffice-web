import { Prop, Vue, Component, Inject, Provide, Watch } from 'vue-property-decorator';
import { Observer, Observable } from 'lafabrika-patterns';

import { ControlState } from '../../classes/controls';
import { AbstractValidator } from '../../classes/validators';
import { ErrorMessagesDictionary } from '../../classes/error-messages';

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
  controlState: ControlState = {
    dirty: false,
    touched: false,
    value: null
  };
  forceValidationFlag = false;

  @Prop() validators!: AbstractValidator[];
  @Prop() errorsDictionary!: ErrorMessagesDictionary;
  @Inject({ default: null }) readonly vObserver!: Observer | null;
  @Provide() iObserver: Observer = this;
  @Watch('validators')
  onValidatorsChange() { this.validate(); }

  /**
   * Validates the value provided
   * @param value to validate
   */
  abstract doValidate(value: any): void;
  /**
   * Returns true if the validation should be performed
   */
  abstract shouldValidate(): boolean;

  /**
   * HOOK: Component creation
   */
  created() {
    this.vid = AbstractValidatorComponent.validatorCounter++;
    if (this.vObserver) {
      this.subscribe(this.vObserver);
      this.vObserver.update(this);
    }
  }

  /**
   * HOOK: Component destruction
   */
  destroyed() {
    if (this.vObserver) {
      this.unsubscribe(this.vObserver);
    }
  }

  /**
   * Validates the state value if should
   */
  validate() {
    if (this.shouldValidate() || this.forceValidationFlag) {
      this.doValidate(this.controlState.value);
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

  update(state: ControlState): void {
    this.controlState = state;
    this.validate();
  }

  forceValidation() {
    this.forceValidationFlag = true;
  }
}
