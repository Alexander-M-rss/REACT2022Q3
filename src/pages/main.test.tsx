import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Main from './main';
import itemsData from 'data/items';
import userEvent from '@testing-library/user-event';
import { OVERLAY_ID } from 'components/modal';

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
          json: () => Promise.resolve({ docs: itemsData, pages: 1 }),
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
        <Main />
      </BrowserRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryAllByRole('link').length).toBeGreaterThan(0);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    expect(screen.queryByAltText('Loading...')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('item-card').length).toBe(itemsData.length);
    expect(screen.queryByTestId('err-msg')).not.toBeInTheDocument();
    expect(fakeFetch).lastCalledWith(
      'https://the-one-api.dev/v2/character/?page=1&limit=10&name=//i',
      options
    );
  });

  it('submits search with results by Enter key pressing in SearchBar', async () => {
    render(
      <BrowserRouter>
        <Main />
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
      'https://the-one-api.dev/v2/character/?page=1&limit=10&name=/Search with result/i',
      options
    );
  });

  it('submits search without results by Search button click', async () => {
    render(
      <BrowserRouter>
        <Main />
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
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByAltText('Loading...')).toBeInTheDocument();
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    expect(screen.queryByAltText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('item-card').length).toBe(0);
    expect(screen.queryByText('Nothing has been found')).toBeInTheDocument();
    expect(fakeFetch.mock.calls[1]).toEqual([
      'https://the-one-api.dev/v2/character/?page=1&limit=10&name=/Search without result/i',
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
        <Main />
      </BrowserRouter>
    );
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('item-card').length).toBe(0);
    expect(screen.queryByTestId('err-msg')).toBeInTheDocument();
  });

  it('shows modal window with full card and closes it', async () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
    expect(await screen.findByTestId('items-cards-list')).toBeInTheDocument();
    let cards = screen.getAllByTestId('item-card');
    expect(cards.length).toEqual(itemsData.length);
    expect(screen.queryByTestId(OVERLAY_ID)).not.toBeInTheDocument();
    userEvent.click(cards[0]);
    const modal = screen.getByTestId(OVERLAY_ID);
    expect(modal).toBeInTheDocument();
    cards = screen.getAllByTestId('item-card');
    expect(cards.length).toEqual(itemsData.length + 1);
    expect(screen.queryByText(/more info/i)).toBeInTheDocument();
    userEvent.click(cards[cards.length - 1]);
    expect(modal).toBeInTheDocument();
    userEvent.click(modal);
    expect(screen.queryByTestId(OVERLAY_ID)).not.toBeInTheDocument();
  });
});
