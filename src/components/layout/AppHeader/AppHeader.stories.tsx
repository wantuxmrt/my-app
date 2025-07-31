import React from 'react';
import AppHeader from './AppHeader';

export default {
  title: 'Components/AppHeader',
  component: AppHeader,
};

const Template = (args: any) => <AppHeader {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    id: 1,
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    role: 'user',
    organization: 'org1',
    department: 'dep1',
    avatar: 'ИИ'
  }
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: null
};

export const Default = Template.bind({});