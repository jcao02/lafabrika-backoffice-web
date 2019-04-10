import { Prop, Vue, Component, Emit } from 'vue-property-decorator';
import { ControlState } from '../../classes/controls/control-state';

/**
 * Represents a component that holds a control
 */
@Component
export class AbstractControlComponent extends Vue {
  @Prop() error!: boolean;
  @Prop() errorMessages!: string[];
  @Prop() value: any;

  state: ControlState = {
    value: this.value,
    dirty: false,
    touched: false
  };

  get touched() {
    return this.state.touched;
  }

  get dirty() {
    return this.state.dirty;
  }

  updated() {
    this.state.value = this.value;
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
  }

}
