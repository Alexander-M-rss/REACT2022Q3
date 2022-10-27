import { IPersonCardProps } from './personCard';

export interface IFormValues extends Omit<IPersonCardProps, 'picture'> {
  picture: FileList;
  consent: string;
}

export type ErrMsg = { [k in keyof IFormValues]: string };
