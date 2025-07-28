import React from 'react';
import { Meta, StoryFn } from '@storybook/react'; 
import Button, { ButtonProps } from './Button'; 
import { JSX } from 'react/jsx-runtime';
export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'outline'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof Button>; // Added generic type

const Template: StoryFn<ButtonProps> = (args: JSX.IntrinsicAttributes & ButtonProps) => <Button {...args} />; // Fixed Story type

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Button',
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Button',
  size: 'small',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Button with Icon',
  icon: <span>🔒</span>,
};