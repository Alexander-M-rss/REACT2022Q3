import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Form from './form';
import { IPersonCardProps } from './personCard';
import userEvent from '@testing-library/user-event';

let outputData: IPersonCardProps;

const addPersonCard = (data: IPersonCardProps) => {
  Object.assign(outputData, data);
};

describe('Form', () => {
  it('renders component', () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getAllByRole('textbox').length).toBe(2);
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/Surname/)).toBeInTheDocument();
    expect(screen.getByText(/Birthday/)).toBeInTheDocument();
    expect(screen.getByText(/Gender/)).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText(/female/)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(2);
    expect(screen.getAllByText(/Country/).length).toBe(2);
    expect(screen.getByText(/Profile picture/)).toBeInTheDocument();
    expect(screen.getByText(/I consent to my personal data/)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('button')).toBeDisabled();
  });
  it('checks name input', async () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.type(screen.getByLabelText(/Name/), 'namevalue');
    expect(screen.getByDisplayValue('namevalue')).toBeInTheDocument;
    expect(await screen.findByRole('button')).not.toBeDisabled();
  });

  it('checks surname input', async () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.type(screen.getByLabelText(/Surname/), 'surnamevalue');
    expect(screen.getByDisplayValue('surnamevalue')).toBeInTheDocument;
    expect(await screen.findByRole('button')).not.toBeDisabled();
  });

  it('checks gender selection', async () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByLabelText('male'));
    expect(screen.getByLabelText('male')).toBeChecked();
    expect(await screen.findByRole('button')).not.toBeDisabled();
    cleanup();
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByLabelText('female'));
    expect(screen.getByLabelText('female')).toBeChecked();
    expect(await screen.findByRole('button')).not.toBeDisabled();
  });

  it('checks country selection', async () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.queryByDisplayValue('Norway')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Country/), { target: { value: 'Norway' } });
    expect(screen.getByDisplayValue('Norway')).toBeInTheDocument();
    expect(await screen.findByRole('button')).not.toBeDisabled();
  });

  it('checks consent checkbox checking', async () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(await screen.findByRole('button')).not.toBeDisabled();
  });
});
