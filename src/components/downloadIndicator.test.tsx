import React from 'react';
import { render, screen } from '@testing-library/react';
import DownloadIndicator from './downloadIndicator';

describe('DowloadIndicator', () => {
  it('renders component', () => {
    render(<DownloadIndicator />);
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });
});
