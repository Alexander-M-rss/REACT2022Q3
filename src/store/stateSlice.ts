import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPersonCardProps } from 'components/personCard';
import { IFormValues } from 'components/formTypes';
import {
  IItemData,
  SORTING,
  DEFAULT_PER_PAGE,
  IGetItemsOptions,
  getItems,
  IItemsResp,
} from 'api/api';

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
  isDataLoading: boolean;
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
  isDataLoading: true,
  errMsg: '',
  search: '',
  pages: 1,
  sorting: SORTING.nameAsc,
  itemsPerPage: DEFAULT_PER_PAGE,
  page: 1,
  detailsIdx: -1,
};

export interface IGetItemsThunkData extends IItemsResp {
  search: string;
  sorting: SORTING;
  page: number;
  itemsPerPage: number;
}

export const getItemsThunk = createAsyncThunk<
  IGetItemsThunkData,
  IGetItemsOptions,
  { rejectValue: string }
>('state/getItemsThunk', async function (opt) {
  const resp = await getItems(opt);

  return {
    items: resp.items,
    pages: resp.pages,
    errMsg: resp.errMsg,
    search: opt.search,
    sorting: opt.sorting,
    page: opt.page,
    itemsPerPage: opt.limit,
  };
});

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
  extraReducers: (builder) => {
    builder
      .addCase(getItemsThunk.pending, (state) => {
        state.isDataLoading = true;
        state.errMsg = '';
      })
      .addCase(getItemsThunk.fulfilled, (state, action) => {
        const { items, errMsg, pages, search, sorting, page, itemsPerPage } = action.payload;

        state.isDataLoading = false;
        state.itemsData = items;
        state.errMsg = errMsg;
        state.pages = pages;
        state.search = search;
        state.sorting = sorting;
        state.page = page;
        state.itemsPerPage = itemsPerPage;
      });
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
