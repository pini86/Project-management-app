export interface FormData {
  name: string;
  login: string;
  password: string;
}

export interface InputAttributes {
  name: 'name' | 'login' | 'password';
  label: string;
  rules: {
    required?: boolean | string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
  };
}

export interface FormProps {
  inputAttributes: InputAttributes[];
  className: string;
  formData: FormData;
  submitBtnText: string;
  additionalText: { mainText: string; linkText: string; linkHref: string };
}
