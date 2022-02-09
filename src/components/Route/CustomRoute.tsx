import React, { useEffect } from 'react';
import queryString from 'query-string';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import RouteLoader from './RouteLoader';

interface Props {
  component: RouteProps['component'];
  path: RouteProps['path'];
  exact?: RouteProps['exact'];
}

function CustomRoute({ component: Components, path, exact, ...otherProps }: Props) {
  const history = useHistory();
  const {
    isAuth,
    userData: { mobileVerified },
    loading: loadingAuth,
  } = useAuth();

  useEffect(() => {
    if (!loadingAuth && isAuth && !mobileVerified) {
      history.push({
        pathname: '/otp',
        search: queryString.stringify({
          ld: '/',
          req: 1,
        }),
      });
    }
  }, [history, isAuth, loadingAuth, mobileVerified]);

  if (loadingAuth) {
    return <RouteLoader />;
  }

  return <Route component={Components} path={path} exact={exact} {...otherProps} />;
}

export default CustomRoute;
