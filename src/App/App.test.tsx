import React from 'react';
import { render } from 'test-utils';
import App from './App';

test('renders the main menu', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/BUSINESS OPS/i);
  expect(linkElement).toBeInTheDocument();
});
