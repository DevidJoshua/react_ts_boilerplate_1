import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const OrderList = loadable(
  () => import(/* webpackChunkName: "order-list" */ './components/Container'),
  {
    fallback: <></>,
    ssr: false,
  },
);

const OrderDetail = loadable(
  () => import(/* webpackChunkName: "order-detail" */ './components/OrderDetail'),
  {
    fallback: <></>,
    ssr: false,
  },
);

function Container() {
  const match = useRouteMatch();
  const { path } = match;

  return (
    <Switch>
      <Route exact path={`${path}/list`} component={OrderList} />
      <Route path={`${path}/detail/:id/:idLogistic`} component={OrderDetail} />
    </Switch>
  );
}

export default Container;
