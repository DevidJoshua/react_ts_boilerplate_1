import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Cart from './Container';
import Recipient from './RecipientData';

function RoutesCart() {
  const match = useRouteMatch();
  const { path } = match;

  return (
    <Switch>
      <Route exact path={`${path}`} component={Cart} />
      <Route path={`${path}/recipient`} component={Recipient} />
    </Switch>
  );
}

export default RoutesCart;
