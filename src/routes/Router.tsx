import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';
import Loader from '@/components/common/Loader/Loader';

const Router: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes location={location}>
        {routesConfig.map((route) => {
          let element = <route.component />;

          if (route.isGuestOnly) {
            element = <GuestRoute>{element}</GuestRoute>;
          } else if (route.isPrivate) {
            element = <PrivateRoute roles={route.roles}>{element}</PrivateRoute>;
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={element}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default Router;