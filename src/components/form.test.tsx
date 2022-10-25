import React from 'react';
import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import Form from './form';
import { IPersonCardProps } from './personCard';
import userEvent from '@testing-library/user-event';

let outputData: IPersonCardProps;

const addPersonCard = (data: IPersonCardProps) => {
  Object.assign(outputData, data);
  console.log('>', data);
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

  it('checks name input', () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.type(screen.getByLabelText(/Name/), 'namevalue');
    expect(screen.getByDisplayValue('namevalue')).toBeInTheDocument;
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('checks surname input', () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.type(screen.getByLabelText(/Surname/), 'surnamevalue');
    expect(screen.getByDisplayValue('surnamevalue')).toBeInTheDocument;
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('checks gender selection', () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByLabelText('male'));
    expect(screen.getByLabelText('male')).toBeChecked();
    expect(screen.getByRole('button')).not.toBeDisabled();
    cleanup();
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByLabelText('female'));
    expect(screen.getByLabelText('female')).toBeChecked();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('checks country selection', () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.queryByDisplayValue('Norway')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Country/), { target: { value: 'Norway' } });
    expect(screen.getByDisplayValue('Norway')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('checks file input', () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/Profile picture/));
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('checks consent checkbox checking', () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('checks and error mesages under form fields', async () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByRole('button')).not.toBeDisabled();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
    await waitFor(() => expect(screen.getAllByText(/should not be empty/).length).toBe(2));
    expect(screen.getByText(/you must be at least 12 yo/)).toBeInTheDocument();
    expect(screen.getByText(/please select country/)).toBeInTheDocument();
    expect(screen.getByText(/please select picture/)).toBeInTheDocument();
    expect(screen.getByText(/please check to proceed/)).toBeInTheDocument();
  });

  it('checks reset error mesages under form fields and submit button enabling', async () => {
    render(<Form addPersonCard={addPersonCard} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByLabelText(/consent/));
    expect(screen.getByLabelText(/consent/)).toBeChecked();
    expect(screen.queryByRole('button')).not.toBeDisabled();
    userEvent.click(screen.getByLabelText(/consent/));
    expect(screen.getByLabelText(/consent/)).not.toBeChecked();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
    await waitFor(() => expect(screen.getAllByText(/should not be empty/).length).toBe(2));
    expect(screen.getByText(/you must be at least 12 yo/)).toBeInTheDocument();
    expect(screen.getByText(/please select country/)).toBeInTheDocument();
    expect(screen.getByText(/please select picture/)).toBeInTheDocument();
    expect(screen.getByText(/please check to proceed/)).toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/Name/), 'namevalue');
    expect(screen.getByText(/you must be at least 12 yo/)).toBeInTheDocument();
    expect(screen.getByText(/please select country/)).toBeInTheDocument();
    expect(screen.getByText(/please select picture/)).toBeInTheDocument();
    expect(screen.getByText(/please check to proceed/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.type(screen.getByLabelText(/Surname/), 'surnamevalue');
    expect(screen.queryByText('should not be empty')).not.toBeInTheDocument();
    expect(screen.getByText(/you must be at least 12 yo/)).toBeInTheDocument();
    expect(screen.getByText(/please select country/)).toBeInTheDocument();
    expect(screen.getByText(/please select picture/)).toBeInTheDocument();
    expect(screen.getByText(/please check to proceed/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByLabelText('male'));
    expect(screen.getByText(/you must be at least 12 yo/)).toBeInTheDocument();
    expect(screen.getByText(/please select country/)).toBeInTheDocument();
    expect(screen.getByText(/please select picture/)).toBeInTheDocument();
    expect(screen.getByText(/please check to proceed/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/Country/), { target: { value: 'Norway' } });
    expect(screen.getByText(/you must be at least 12 yo/)).toBeInTheDocument();
    expect(screen.queryByText(/please select country/)).not.toBeInTheDocument();
    expect(screen.getByText(/please select picture/)).toBeInTheDocument();
    expect(screen.getByText(/please check to proceed/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/Birthday/), { target: { value: '2002-02-04' } });
    expect(screen.queryByText(/you must be at least 12 yo/)).not.toBeInTheDocument();
    expect(screen.getByText(/please select picture/)).toBeInTheDocument();
    expect(screen.getByText(/please check to proceed/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByText(/please select picture/)).toBeInTheDocument();
    expect(screen.queryByText(/please check to proceed/)).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/Profile picture/));
    expect(screen.queryByText(/please select picture/)).not.toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
