import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Input, { InputProps } from './Input';

export default {
  title: 'Common/Input',
  component: Input,
  argTypes: {
    type: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} as Meta;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text...',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  placeholder: 'Search...',
  icon: <span>🔍</span>,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Disabled input',
  disabled: true,
};