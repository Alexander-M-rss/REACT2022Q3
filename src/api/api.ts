const BASE_URL = 'https://the-one-api.dev/v2';
const ITEMS_ENDPOINT = '/character';
const ITEMS_URL = BASE_URL + ITEMS_ENDPOINT;
const TOKEN = 'qUlM6gAOQnY1o9NArsHP';

export enum SORTING {
  nameAsc = 'name:asc',
  nameDesc = 'name:desc',
  raceAsc = 'race:asc',
  raceDesc = 'race:desc',
  heightAsc = 'height:asc',
  heightDesc = 'height:desc',
}

export interface IItemData {
  _id: string;
  name: string;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  wikiUrl: string;
}

interface IApiResp<T> {
  docs: T;
  total: number;
  limit: number;
  page: number;
  pages: number;
}

interface IItemsResp {
  items: IItemData[];
  pages: number;
  errMsg: string;
}

export interface IGetItemsOptions {
  search: string;
  page: number;
  limit: number;
  sorting: SORTING;
}

export const getItems = async (opt: IGetItemsOptions): Promise<IItemsResp> => {
  const itemResp: IItemsResp = {
    items: [],
    pages: 1,
    errMsg: '',
  };

  try {
    const resp = await fetch(
      `${ITEMS_URL}/?page=${opt.page}&limit=${opt.limit}&sort=${opt.sorting}&name=/${opt.search}/i`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: 'application/json',
        },
      }
    );

    if (resp.ok) {
      const { docs, pages } = (await resp.json()) as IApiResp<IItemData[]>;

      if (docs.length) {
        itemResp.items = docs;
      } else {
        itemResp.errMsg = 'Nothing has been found';
      }
      itemResp.pages = pages;
    } else {
      itemResp.errMsg = resp.statusText;
    }
  } catch (e: unknown) {
    itemResp.errMsg = e instanceof Error ? e.message : 'Uknown Error';
  }

  return itemResp;
};
