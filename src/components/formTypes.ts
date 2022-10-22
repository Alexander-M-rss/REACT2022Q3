import { IPersonCardProps } from './personCard';

export interface IFormValues extends IPersonCardProps {
  consent: string;
}

export type NotValidInputs = { [k in keyof IFormValues]: boolean };
