interface FieldOption {
  value: string;
  placeholder: string;
}

interface Field {
  name: string;
  type: string;
  defaultValue?: string;
  value?: string;
  options?: FieldOption[];
}
