import React from 'react';
import { render, screen } from '@testing-library/react';
import PopupMsg from './popupMsg';
import userEvent from '@testing-library/user-event';

let closedHadlerCallCount = 0;
const timeout = 500;

const closeHandler = () => {
  closedHadlerCallCount += 1;
};

describe('PopupMsg', () => {
  it('renders component', () => {
    render(<PopupMsg text="Message" timeout={timeout} closeHandler={closeHandler} />);
    expect(screen.getByText(/Message/)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(closedHadlerCallCount).toBe(1);
  });
  it('calls closeHandler after timeout', async () => {
    await new Promise((res) => setTimeout(() => res(0), timeout * 2));
    closedHadlerCallCount = 0;
    render(<PopupMsg text="Message" timeout={timeout} closeHandler={closeHandler} />);
    expect(screen.getByText(/Message/)).toBeInTheDocument();
    await new Promise((res) => setTimeout(() => res(0), timeout * 2));
    expect(closedHadlerCallCount).toBe(1);
  });
});
