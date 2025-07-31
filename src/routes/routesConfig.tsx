import { lazy } from 'react';
import { RouteConfig } from './routes.d';

// Ленивая загрузка страниц
const LoginPage = lazy(() => import('@/sections/LoginPage'));
const MainPage = lazy(() => import('@/sections/MainPage'));
const ProfilePage = lazy(() => import('@/sections/ProfilePage'));
const ModerationPage = lazy(() => import('@/sections/ModerationPage'));
const AdminPage = lazy(() => import('@/sections/AdminPage'));
const CreateRequestPage = lazy(() => import('@/sections/CreateRequestPage'));
const NotFoundPage = lazy(() => import('@/sections/NotFoundPage'));
const HelpPage = lazy(() => import('@/sections/HelpPage'));

export const routesConfig: RouteConfig[] = [
  {
    path: '/login',
    component: LoginPage,
    isGuestOnly: true,
  },
  {
    path: '/',
    component: MainPage,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/profile',
    component: ProfilePage,
    isPrivate: true,
  },
  {
    path: '/moderation',
    component: ModerationPage,
    isPrivate: true,
    roles: ['manager'],
  },
  {
    path: '/admin',
    component: AdminPage,
    isPrivate: true,
    roles: ['admin'],
  },
  {
    path: '/create-request',
    component: CreateRequestPage,
    isPrivate: true,
  },
  {
    path: '/help',
    component: HelpPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];