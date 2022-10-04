import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from './aboutUs';

describe('About Us section', () => {
  it('renders component', () => {
    const { asFragment } = render(<AboutUs />);
    expect(asFragment()).toMatchSnapshot();
  });
});
