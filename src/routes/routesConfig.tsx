// Типы для ролей пользователей
export type UserRole = 'user' | 'support' | 'admin' | 'manager';

// Интерфейс конфигурации маршрута
export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  isPrivate?: boolean;
  allowedRoles?: UserRole[];
  layout?: boolean;
}

// Импорт страниц
import MainPage from '../components/common/sections/MainPage/MainPage';
import LoginPage from '../components/common/sections/LoginPage/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../components/common/sections/NotFoundPage/NotFoundPage';

// Создадим заглушки для недостающих страниц
const ModerationPage = () => <div>Moderation Page</div>;
const HelpPage = () => <div>Help Page</div>;

// Конфигурация маршрутов
const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: <MainPage />,
    isPrivate: true,
    allowedRoles: ['user', 'support', 'admin', 'manager'],
    layout: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    layout: false,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    isPrivate: true,
    allowedRoles: ['user', 'support', 'admin', 'manager'],
    layout: true,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    isPrivate: true,
    allowedRoles: ['admin'],
    layout: true,
  },
  {
    path: '/moderation',
    element: <ModerationPage />,
    isPrivate: true,
    allowedRoles: ['manager'],
    layout: true,
  },
  {
    path: '/help',
    element: <HelpPage />,
    isPrivate: true,
    allowedRoles: ['user', 'support', 'admin', 'manager'],
    layout: true,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    layout: false,
  },
];

export default routesConfig;