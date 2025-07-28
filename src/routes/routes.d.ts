import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  element: ComponentType;
  isPublic?: boolean;
  exact?: boolean;
  guestOnly?: boolean;
  pageTitle: string;
  requiredRoles?: string[];
}