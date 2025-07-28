import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Card from './Card';
import type { CardProps } from './Card';

export default {
  title: 'Common/Card',
  component: Card,
} as Meta;

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <p>This is a card component</p>,
};