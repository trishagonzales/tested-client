export interface BaseProps {
  className?: string;
}

export type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'range'
  | 'url'
  | 'date'
  | 'time'
  | 'search'
  | 'tel';

export interface LoginInput {
  username: string;
  password: string;
}

export interface SignupInput extends LoginInput {
  name: string;
  email: string;
}
