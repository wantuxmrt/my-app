import { lazy } from 'react';
import { RouteConfig } from './routes.d';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ModerationPage = lazy(() => import('@/pages/ModerationPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const AdminPanelPage = lazy(() => import('@/pages/AdminPanelPage'));
const CreateRequestPage = lazy(() => import('@/pages/CreateRequestPage'));
const HelpPage = lazy(() => import('@/pages/HelpPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ReportBuilderPage = lazy(() => import('@/pages/ReportBuilderPage'));

export const routesConfig: RouteConfig[] = [
  {
    path: '/login',
    component: LoginPage,
    isGuestOnly: true,
  },
  {
    path: '/register',
    component: RegisterPage,
    isGuestOnly: true,
  },
  {
    path: '/',
    component: MainPage,
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
    path: '/admin-panel',
    component: AdminPanelPage,
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
    path: '/report-builder',
    component: ReportBuilderPage,
    isPrivate: true,
    roles: ['admin', 'manager'],
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];