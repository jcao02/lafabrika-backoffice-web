import { Prop, Vue, Component, Emit, Inject } from 'vue-property-decorator';
import { ControlState } from '../../classes/controls/control-state';
import { Observable } from '@/modules/shared/classes/observable';
import { Observer } from '@/modules/shared/classes/observer';

/**
 * Represents a component that holds a control
 */
@Component
export class AbstractControlComponent extends Vue implements Observable {
  @Prop() error!: boolean;
  @Prop() errorMessages!: string[];
  @Prop() value: any;
  @Inject({ default: null }) iObserver!: Observer | null;

  state: ControlState = {
    value: this.value,
    dirty: false,
    touched: false
  };
  observers: Observer[] = [];

  get touched() {
    return this.state.touched;
  }

  get dirty() {
    return this.state.dirty;
  }

  created() {
    if (this.iObserver) {
      this.subscribe(this.iObserver);
    }
  }

  updated() {
    this.state.value = this.value;
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
  protected input(value: any): void {
    if (this.value !== value && !this.dirty) {
      this.state = { ...this.state, dirty: true };
    }

    // Notify to observers everytime user changes input
    this.notify();
  }

  /**
   * Emits 'blur' event
   * @param value to be emitted
   */
  @Emit()
  // tslint:disable-next-line: no-empty
  protected blur(value: FocusEvent): void {
    if (!this.touched) {
      this.state = { ...this.state, touched: true };
    }

    // Notify to observers everytime user unfocuses input
    this.notify();
  }

}
