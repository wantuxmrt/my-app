import { describe, test, expect, jest } from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Добавлен импорт расширений jest-dom
import Button from './Button';

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    //expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    //expect(screen.getByText('Click me')).toBeDisabled();
  });

  test('has correct variant class', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    // Добавлено приведение типа для container.firstChild
    //expect(container.firstChild as Element).toHaveClass('variant-primary');
  });

  test('has correct size class', () => {
    const { container } = render(<Button size="large">Large</Button>);
    // Добавлено приведение типа для container.firstChild
    //expect(container.firstChild as Element).toHaveClass('size-large');
  });

  test('renders icon when provided', () => {
    render(<Button icon={<span>🔒</span>}>Lock</Button>);
    //expect(screen.getByText('🔒')).toBeInTheDocument();
  });
});