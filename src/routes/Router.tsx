// Файл: src/routes/Router.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routesConfig from './routesConfig';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';
import AppLayout from '../components/layout/AppLayout';
import EmptyLayout from '../components/layout/EmptyLayout';

const Router: React.FC = () => {
  return (
    <Routes>
      {routesConfig.map((route) => {
        const Layout = route.layout ? AppLayout : EmptyLayout;
        const RouteElement = route.isPrivate ? (
          <PrivateRoute allowedRoles={route.allowedRoles}>
            <Layout>{route.element}</Layout>
          </PrivateRoute>
        ) : route.path === '/login' ? (
          <GuestRoute>
            <Layout>{route.element}</Layout>
          </GuestRoute>
        ) : (
          <Layout>{route.element}</Layout>
        );

        return (
          <Route
            key={route.path}
            path={route.path}
            element={RouteElement}
          />
        );
      })}
    </Routes>
  );
};

export default Router;