import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tab from './Tab';

describe('Tab', () => {
  test('renders tab with label', () => {
    render(<Tab label="Test Tab" />);
    expect(screen.getByText('Test Tab')).toBeInTheDocument();
  });

  test('applies active class when active', () => {
    const { container } = render(<Tab label="Test Tab" active />);
    expect(container.firstChild).toHaveClass('active');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Tab label="Test Tab" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Test Tab'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders icon when provided', () => {
    render(<Tab label="Test Tab" icon={<span>📁</span>} />);
    expect(screen.getByText('📁')).toBeInTheDocument();
  });
});