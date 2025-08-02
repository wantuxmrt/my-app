import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
  test('renders select with options', () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBe(3);
  });

  test('displays placeholder', () => {
    render(<Select options={options} value="" onChange={() => {}} placeholder="Select" />);
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Select options={options} value="" onChange={() => {}} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  test('calls onChange when selection changes', () => {
    const handleChange = jest.fn();
    render(<Select options={options} value="" onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});