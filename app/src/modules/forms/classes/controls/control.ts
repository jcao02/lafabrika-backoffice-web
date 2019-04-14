/**
 * Interface that represents a control props
 */
export interface Control {
  value: any;
  label: string;
  type: string;
  placeholder: string;

  input(value: any): void;
  blur(value: FocusEvent): void;
}
