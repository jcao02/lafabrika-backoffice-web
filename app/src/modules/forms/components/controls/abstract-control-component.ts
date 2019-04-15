import { Prop, Vue, Component, Emit, Inject } from 'vue-property-decorator';
import { Observable } from '@/modules/shared/classes/observables/observable';
import { Observer } from '@/modules/shared/classes/observables/observer';

import { ControlState, Control } from '../../classes/controls';

/**
 * Represents a component that holds a control
 */
@Component
export class AbstractControlComponent extends Vue implements Observable, Control {
  @Prop() error!: boolean;
  @Prop() errorMessages!: string[];
  @Prop() value: any;
  @Prop() label!: string;
  @Prop() type!: string;
  @Prop() placeholder!: string;

  @Inject({ default: null }) iObserver!: Observer | null;

  state: ControlState = {
    value: this.value,
    dirty: false,
    touched: false
  };
  observers: Observer[] = [];

  created() {
    if (this.iObserver) {
      this.subscribe(this.iObserver);
    }
  }

  destroyed() {
    if (this.iObserver) {
      this.unsubscribe(this.iObserver);
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
      obs.update(this.state);
    });
  }

  /**
   * Emits 'input' event
   * @param value to be emitted
   */
  @Emit()
  // tslint:disable-next-line: no-empty
  input(value: any): void {
    let newState: Partial<ControlState> = { value };
    if (this.value !== value && !this.state.dirty) {
      newState = { ...newState, dirty: true };
    }

    // Update state
    this.state = { ...this.state, ...newState };

    // Notify to observers everytime user changes input
    this.notify();
  }

  /**
   * Emits 'blur' event
   * @param value to be emitted
   */
  @Emit()
  // tslint:disable-next-line: no-empty
  blur(value: FocusEvent): void {
    if (!this.state.touched) {
      this.state = { ...this.state, touched: true };
    }

    // Notify to observers everytime user unfocuses input
    this.notify();
  }

}
