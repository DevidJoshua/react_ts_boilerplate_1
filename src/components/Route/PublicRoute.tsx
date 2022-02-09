import React, { useEffect } from 'react';
import { Route, RouteProps, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useAuth } from '@/context/Auth';

interface Props {
  component: RouteProps['component'];
  path: RouteProps['path'];
  exact?: RouteProps['exact'];
}

function PublicRoute({ component: Components, path, exact, ...otherProps }: Props) {
  const { search } = useLocation();
  const { isAuth, loading } = useAuth();

  useEffect(() => {
    const ld = queryString.parse(search)?.ld || '';

    if (isAuth && !loading) {
      if (ld) {
        window.location.replace(String(ld));

        return;
      }

      return window.location.replace('/');
    }
  }, [isAuth, loading, search]);

  return <Route component={Components} exact={exact} path={path} {...otherProps} />;
}

export default PublicRoute;
