import React, { useEffect, useState } from 'react';
import { HOSTNAME } from '@config';
import { Route, RouteProps, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import RouteLoader from './RouteLoader';

interface Props {
  component: RouteProps['component'];
  path: RouteProps['path'];
  exact?: RouteProps['exact'];
}

function PrivateRoute({ component: Components, path, exact, ...otherProps }: Props) {
  const { isAuth, loading: loadingAuth } = useAuth();
  const { pathname, search, hash } = useLocation();
  const [redirecting, setRedirecting] = useState<boolean>(false);

  useEffect(
    function redirectNonLogin() {
      if (!redirecting && !isAuth && loadingAuth === false) {
        setRedirecting(true);
        const ldUrl = new URL(pathname + search + hash, HOSTNAME);
        const loginUrl = new URL('login', HOSTNAME);
        const loginSearchParams = loginUrl.searchParams;
        loginSearchParams.set('ld', ldUrl.toString());
        window.location.replace(loginUrl.toString());
      }
    },
    [hash, isAuth, loadingAuth, pathname, redirecting, search],
  );

  if (loadingAuth || redirecting) {
    return <RouteLoader />;
  }

  if (!redirecting && !isAuth && loadingAuth === false) {
    return <RouteLoader />;
  }

  return <Route component={Components} path={path} exact={exact} {...otherProps} />;
}

export default PrivateRoute;
