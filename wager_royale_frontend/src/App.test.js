import { render, screen } from '@testing-library/react';
import AppWithRouter from './App';

test('renders navbar brand', () => {
  render(<AppWithRouter />);
  const brand = screen.getByText(/Wager Royale/i);
  expect(brand).toBeInTheDocument();
});
