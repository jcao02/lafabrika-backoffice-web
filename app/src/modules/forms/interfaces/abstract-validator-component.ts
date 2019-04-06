import { Prop, Vue } from 'vue-property-decorator';
import { AbstractValidator } from './abstract-validator';

/**
 * Represents a component that holds a control
 */
export abstract class AbstractValidatorComponent extends Vue {
  @Prop() validators!: AbstractValidator[];

  abstract validate(): void;
}
