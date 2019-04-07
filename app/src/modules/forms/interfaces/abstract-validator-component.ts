import { Prop, Vue } from 'vue-property-decorator';
import { AbstractValidator } from './abstract-validator';
import { ErrorMessagesDictionary } from './error-messages-dictionary';

/**
 * Represents a component that holds a control
 */
export abstract class AbstractValidatorComponent extends Vue {
  @Prop() validators!: AbstractValidator[];
  @Prop() errorsDictionary!: ErrorMessagesDictionary;

  abstract validate(value: any): void;
}
