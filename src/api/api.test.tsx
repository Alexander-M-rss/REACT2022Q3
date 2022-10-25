import itemsData from 'data/items';
import { getItems } from './api';

describe('getItems', () => {
  it('gets valid data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve({ docs: itemsData, pages: 1 }),
    } as Response);

    const data = await getItems('');

    expect(data).toStrictEqual({
      items: itemsData,
      pages: 1,
      errMsg: '',
    });
  });
  it('gets empty data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve({ docs: [], pages: 1 }),
    } as Response);

    const data = await getItems('');

    expect(data).toStrictEqual({
      items: [],
      pages: 1,
      errMsg: 'Nothing has been found',
    });
  });
  it('gets invalid JSON data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve(itemsData),
    } as Response);

    const data = await getItems('');

    expect(data.items).toEqual([]);
    expect(data.pages).toEqual(0);
    expect(data.errMsg.length).toBeGreaterThan(0);
  });
});
