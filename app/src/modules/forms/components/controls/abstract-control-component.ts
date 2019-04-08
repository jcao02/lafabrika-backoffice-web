import { Prop, Vue, Component, Emit } from 'vue-property-decorator';

/**
 * Represents a component that holds a control
 */
@Component
export class AbstractControlComponent extends Vue {
  @Prop() error!: boolean;
  @Prop() errorMessages!: string[];
  @Prop() value: any;

  /**
   * Emits 'input' event
   * @param value to be emitted
   */
  @Emit()
  // tslint:disable-next-line: no-empty
  protected input(value: any): void {}

  /**
   * Emits 'blur' event
   * @param value to be emitted
   */
  @Emit()
  // tslint:disable-next-line: no-empty
  protected blur(value: FocusEvent): void {}
}
