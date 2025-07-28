import React from 'react';
// Use StoryFn instead of Story
import { Meta, StoryFn } from '@storybook/react';
// Import CheckboxProps as named export
import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  title: 'Common/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  // Add default args for required props
  args: {
    checked: false,
    onChange: () => {},
  },
} as Meta<typeof Checkbox>;

// Use StoryFn<CheckboxProps> instead of Story<CheckboxProps>
const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox',
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Checked',
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {};