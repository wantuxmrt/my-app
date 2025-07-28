import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  test('renders children', () => {
    render(<Card><div>Test Card</div></Card>);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });
});