import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Main from './main';
import itemsData from 'data/items';
import userEvent from '@testing-library/user-event';
import { GlobalStatePovider } from 'state/context';

let fakeFetch: jest.SpyInstance<
  Promise<Response>,
  [input: RequestInfo | URL, init?: RequestInit | undefined]
>;

const options = {
  headers: { Accept: 'application/json', Authorization: 'Bearer qUlM6gAOQnY1o9NArsHP' },
  method: 'GET',
};

beforeEach(
  () =>
    (fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return new Promise(async (resolve) => {
        const sleep = async (delay: number) => setTimeout(() => {}, delay);
        await sleep(1000);
        resolve({
          ok: true,
          status: 200,
          statusText: 'OK',
          json: () => Promise.resolve({ docs: itemsData, pages: 10 }),
        } as Response);
      });
    }))
);

afterEach(() => {
  jest.resetAllMocks();
});

describe('Main page', () => {
  it('renders component', async () => {
    render(
      <BrowserRouter>
        <GlobalStatePovider>
          <Main />
        </GlobalStatePovider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryAllByRole('link').length).toBeGreaterThan(0);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('sort')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    expect(screen.queryByAltText('Loading...')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('item-card').length).toBe(itemsData.length);
    expect(screen.queryByTestId('err-msg')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sort')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).toBeInTheDocument();
    expect(fakeFetch).lastCalledWith(
      'https://the-one-api.dev/v2/character/?page=1&limit=10&sort=name:asc&name=//i',
      options
    );
  });

  it('submits search with results by Enter key pressing in SearchBar', async () => {
    render(
      <BrowserRouter>
        <GlobalStatePovider>
          <Main />
        </GlobalStatePovider>
      </BrowserRouter>
    );
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    userEvent.type(screen.getByRole('textbox'), '{selectall}Search with result{Enter}');
    expect(await screen.findByAltText('Loading...')).toBeInTheDocument();
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    expect(screen.queryByAltText('Loading...')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('item-card').length).toBe(itemsData.length);
    expect(screen.queryByTestId('err-msg')).not.toBeInTheDocument();
    expect(fakeFetch).toBeCalledWith(
      'https://the-one-api.dev/v2/character/?page=1&limit=10&sort=name:asc&name=/Search with result/i',
      options
    );
  });

  it('submits search without results by Search button click', async () => {
    render(
      <BrowserRouter>
        <GlobalStatePovider>
          <Main />
        </GlobalStatePovider>
      </BrowserRouter>
    );
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();

    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return new Promise(async (resolve) => {
        const sleep = async (delay: number) => setTimeout(() => {}, delay);
        await sleep(1000);
        resolve({
          ok: true,
          status: 200,
          statusText: 'OK',
          json: () => Promise.resolve({ docs: [], pages: 0 }),
        } as Response);
      });
    });

    userEvent.type(screen.getByRole('textbox'), '{selectall}Search without result');
    userEvent.click(screen.getAllByRole('button')[0]);
    expect(await screen.findByAltText('Loading...')).toBeInTheDocument();
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    expect(screen.queryByAltText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('item-card').length).toBe(0);
    expect(screen.queryByText('Nothing has been found')).toBeInTheDocument();
    expect(fakeFetch.mock.calls[1]).toEqual([
      'https://the-one-api.dev/v2/character/?page=1&limit=10&sort=name:asc&name=/Search without result/i',
      options,
    ]);
  });

  it('recieves invalid data', async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return new Promise(async (resolve) => {
        const sleep = async (delay: number) => setTimeout(() => {}, delay);
        await sleep(1000);
        resolve({
          ok: true,
          status: 200,
          statusText: 'OK',
          json: () => Promise.resolve([]),
        } as Response);
      });
    });

    render(
      <BrowserRouter>
        <GlobalStatePovider>
          <Main />
        </GlobalStatePovider>
      </BrowserRouter>
    );
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('item-card').length).toBe(0);
    expect(screen.queryByTestId('err-msg')).toBeInTheDocument();
  });

  it('tests next, last, previous and first pages switching', async () => {
    render(
      <BrowserRouter>
        <GlobalStatePovider>
          <Main />
        </GlobalStatePovider>
      </BrowserRouter>
    );
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: '>' }));
    expect(fakeFetch.mock.calls[1]).toEqual([
      'https://the-one-api.dev/v2/character/?page=2&limit=10&sort=name:asc&name=//i',
      options,
    ]);
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: '>>' }));
    expect(fakeFetch.mock.calls[2]).toEqual([
      'https://the-one-api.dev/v2/character/?page=10&limit=10&sort=name:asc&name=//i',
      options,
    ]);
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: '<' }));
    expect(fakeFetch.mock.calls[3]).toEqual([
      'https://the-one-api.dev/v2/character/?page=9&limit=10&sort=name:asc&name=//i',
      options,
    ]);
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: '<<' }));
    expect(fakeFetch.mock.calls[4]).toEqual([
      'https://the-one-api.dev/v2/character/?page=1&limit=10&sort=name:asc&name=//i',
      options,
    ]);
  });

  it('tests number of items per page switching', async () => {
    render(
      <BrowserRouter>
        <GlobalStatePovider>
          <Main />
        </GlobalStatePovider>
      </BrowserRouter>
    );
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    userEvent.selectOptions(screen.getByTestId('per-page'), '20');
    expect(fakeFetch.mock.calls[1]).toEqual([
      'https://the-one-api.dev/v2/character/?page=1&limit=20&sort=name:asc&name=//i',
      options,
    ]);
  });

  it('tests sorting mode switching', async () => {
    render(
      <BrowserRouter>
        <GlobalStatePovider>
          <Main />
        </GlobalStatePovider>
      </BrowserRouter>
    );
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    userEvent.selectOptions(
      screen.getByTestId('sort'),
      screen.getByRole('option', { name: 'Name Descending' })
    );
    expect(fakeFetch.mock.calls[1]).toEqual([
      'https://the-one-api.dev/v2/character/?page=1&limit=10&sort=name:desc&name=//i',
      options,
    ]);
  });
});
