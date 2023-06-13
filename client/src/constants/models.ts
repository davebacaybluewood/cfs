export interface ILabeledInput {
  name: string;
  label: string;
  value: string;
  colDef: {
    xs: number;
    md: number;
    lg: number;
  };
  disabled?: boolean;
  isTextArea?: boolean;
  type?: string;
  isAutoComplete?: boolean;
  isDate?: boolean;
}
