import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';
import Loader from '@/components/common/Loader/Loader';

const Router: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<Loader />}>
      <Routes location={location}>
        {routesConfig.map((route, index) => {
          let element = <route.component />;

          if (route.isGuestOnly) {
            element = <GuestRoute>{element}</GuestRoute>;
          } else if (route.isPrivate) {
            element = <PrivateRoute roles={route.roles}>{element}</PrivateRoute>;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={element}
              index={route.exact}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default Router;