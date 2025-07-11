export interface FieldOption {
  value: string;
  placeholder: string;
}

export interface Field {
  name?: string;
  type: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  options?: FieldOption[];
}
