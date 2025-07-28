import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TabsNavigation from './TabsNavigation';

export default {
  title: 'Common/TabsNavigation',
  component: TabsNavigation,
  decorators: [(Story: React.ComponentType) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  )],
};

const Template = () => <TabsNavigation />;

export const Default = Template.bind({});