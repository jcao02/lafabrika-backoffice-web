import { Prop, Vue, Component } from 'vue-property-decorator';

/**
 * Represents a component that holds a control
 */
@Component({})
export class AbstractControl extends Vue {
  @Prop(Boolean) error!: boolean;
  @Prop(Array(String)) errorMessages!: string[];
  @Prop() value: any;

  /**
   * Emits 'input' event
   * @param value to be emitted
   */
  protected emitInput(value: any): void {
    this.$emit('input', value);
  }
}
