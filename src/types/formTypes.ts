// types/formTypes.ts
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'checkbox' | 'date' | 'file';
  required: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
}