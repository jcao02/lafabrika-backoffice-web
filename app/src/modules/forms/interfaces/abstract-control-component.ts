import { Prop, Vue, Component, Emit } from 'vue-property-decorator';

/**
 * Represents a component that holds a control
 */
@Component
export class AbstractControlComponent extends Vue {
  @Prop() error!: boolean;
  @Prop() errormessages!: string[];
  @Prop() value: any;

  /**
   * Emits 'input' event
   * @param value to be emitted
   */
  @Emit()
  protected input(value: any): any {
    return value;
  }

  /**
   * Emits 'blur' event
   * @param value to be emitted
   */
  @Emit()
  protected blur(value: FocusEvent): FocusEvent {
    return value;
  }
}
