import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import AddAddress from './Add';
import ListAddress from './List';
import ChooseLocation from './ChooseLocation';

function Container() {
  const match = useRouteMatch();
  const { path } = match;

  return (
    <Switch>
      <Route exact path={`${path}/list`} component={ListAddress} />
      <Route path={`${path}/choose-location`} component={ChooseLocation} />
      <Route path={`${path}/Add`} component={AddAddress} />
    </Switch>
  );
}

export default Container;
