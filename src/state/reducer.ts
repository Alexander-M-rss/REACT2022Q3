import React from 'react';
import { IPersonCardProps } from '../components/personCard';
import { IFormValues } from 'components/formTypes';

export enum ACTION {
  addPersonCard = 'addPersonCard',
  saveFormValues = 'saveFormValues',
}

export interface IAction {
  type: ACTION;
  payload?: IPersonCardProps | IFormValues;
}

export interface IGlobalState {
  personCards: IPersonCardProps[];
  formValues?: IFormValues;
}

export const initialGlobalState: IGlobalState = {
  personCards: [],
};

const reducer: React.Reducer<IGlobalState, IAction> = (
  globalState: IGlobalState,
  action: IAction
) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION.addPersonCard:
      return {
        ...globalState,
        personCards: [...globalState.personCards, payload as IPersonCardProps],
      };
    case ACTION.saveFormValues:
      return {
        ...globalState,
        formValues: payload as IFormValues,
      };
    default:
      return globalState;
  }
};

export default reducer;
