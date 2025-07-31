import { Role } from '@/types/app';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  roles?: Role[];
  isPrivate?: boolean;
  isGuestOnly?: boolean;
}

export interface PrivateRouteProps {
  roles?: Role[];
  children: React.ReactNode;
}

export interface GuestRouteProps {
  children: React.ReactNode;
}