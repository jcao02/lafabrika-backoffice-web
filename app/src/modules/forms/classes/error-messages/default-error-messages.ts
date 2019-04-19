import { ErrorMessagesDictionary } from './error-messages-dictionary';
import { ValidatorName } from '../validators';

export const defaultDictionary: ErrorMessagesDictionary = {
  default: 'Hay un error en este campo',
  [ValidatorName.REQUIRED]: 'Campo requerido',
  [ValidatorName.EMAIL]: 'Email inválido',
  [ValidatorName.MINLENGTH]: 'Debe tener al menos X caracteres'
};
