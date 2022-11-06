import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPersonCardProps } from 'components/personCard';
import { IFormValues } from 'components/formTypes';
import { IItemData, SORTING, DEFAULT_PER_PAGE } from 'api/api';

interface IItemsPayload {
  itemsData: IItemData[];
  errMsg: string;
  pages: number;
  search?: string;
  sorting?: SORTING;
  page?: number;
  itemsPerPage?: number;
}

export type FormValuesState = Omit<IFormValues, 'picture'>;

export interface IState {
  personCards: IPersonCardProps[];
  formValues?: FormValuesState;
  itemsData?: IItemData[];
  errMsg: string;
  search: string;
  pages: number;
  sorting: SORTING;
  itemsPerPage: number;
  page: number;
  detailsIdx: number;
}

export const initialState: IState = {
  personCards: [],
  errMsg: '',
  search: '',
  pages: 1,
  sorting: SORTING.nameAsc,
  itemsPerPage: DEFAULT_PER_PAGE,
  page: 1,
  detailsIdx: -1,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    savePersonCard(state, action: PayloadAction<IPersonCardProps>) {
      state.personCards.push(action.payload);
    },
    saveFormValues(state, action: PayloadAction<FormValuesState>) {
      state.formValues = action.payload;
    },
    saveItemsData(state, action: PayloadAction<IItemsPayload>) {
      return { ...state, ...action.payload };
    },
    setDetailsIdx(state, action: PayloadAction<number>) {
      state.detailsIdx = action.payload;
    },
    resetDetailsIdx(state) {
      state.detailsIdx = -1;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  savePersonCard,
  saveFormValues,
  saveItemsData,
  setDetailsIdx,
  resetDetailsIdx,
  resetState,
} = stateSlice.actions;
export default stateSlice.reducer;
