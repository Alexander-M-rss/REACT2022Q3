import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Forms from './forms';
import { Provider } from 'react-redux';
import store from 'store/store';

describe('Forms page', () => {
  it('renders component', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Forms />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryAllByRole('link').length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
  });
});
