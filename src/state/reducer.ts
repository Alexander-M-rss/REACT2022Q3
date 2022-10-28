import React from 'react';
import { IPersonCardProps } from '../components/personCard';
import { IFormValues } from 'components/formTypes';
import { IItemData } from 'api/api';

export enum ACTION {
  addPersonCard = 'addPersonCard',
  saveFormValues = 'saveFormValues',
  saveItemsData = 'saveItemsData',
}

interface IItemsPayload {
  itemsData: IItemData[];
  errMsg: string;
}

export interface IAction {
  type: ACTION;
  payload?: IPersonCardProps | IFormValues | IItemsPayload;
}

export interface IGlobalState {
  personCards: IPersonCardProps[];
  formValues?: IFormValues;
  itemsData?: IItemData[];
  errMsg: string;
}

export const initialGlobalState: IGlobalState = {
  personCards: [],
  errMsg: '',
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
    case ACTION.saveItemsData:
      return {
        ...globalState,
        ...(payload as IItemsPayload),
      };
    default:
      return globalState;
  }
};

export default reducer;
