import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal, { OVERLAY_ID } from './modal';
import userEvent from '@testing-library/user-event';

const closeHandler = jest.fn();

describe('Modal', () => {
  it('renders component', () => {
    render(<Modal closeHandler={closeHandler}>Message text</Modal>);
    expect(screen.getByTestId(OVERLAY_ID)).toBeInTheDocument();
    expect(screen.getByText(/Message text/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('closes component by outside the modal window click ', () => {
    render(<Modal closeHandler={closeHandler}>Message text</Modal>);
    userEvent.click(screen.getByTestId(OVERLAY_ID));
    expect(closeHandler).toBeCalledTimes(1);
  });
  it('does not close component by inside the modal window click', () => {
    render(<Modal closeHandler={closeHandler}>Message text</Modal>);
    userEvent.click(screen.getByText(/Message text/));
    expect(closeHandler).not.toBeCalled;
  });
  it('closes component by close button click ', () => {
    render(<Modal closeHandler={closeHandler}>Message text</Modal>);
    userEvent.click(screen.getByRole('button'));
    expect(closeHandler).toBeCalledTimes(1);
  });
});
