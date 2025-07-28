import { UserRole } from './app';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  roles?: UserRole[];
  isPrivate?: boolean;
  isGuestOnly?: boolean;
}

export interface PrivateRouteProps {
  roles?: UserRole[];
  children: React.ReactNode;
}

export interface GuestRouteProps {
  children: React.ReactNode;
}