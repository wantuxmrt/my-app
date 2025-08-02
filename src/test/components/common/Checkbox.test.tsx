import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('renders checkbox with label', () => {
    render(<Checkbox label="Test Checkbox" checked={false} onChange={() => {}} />);
    expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test Checkbox" checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Test Checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('is checked when checked prop is true', () => {
    render(<Checkbox label="Test Checkbox" checked onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Checkbox label="Test Checkbox" checked={false} onChange={() => {}} disabled />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });
});