import React from 'react';
import loadable from '@loadable/component';
import { Switch, useRouteMatch } from 'react-router-dom';

import LoaderLoadable from '@/components/LoaderLoadable';
import PrivateRoute from '@/components/Route/PrivateRoute';
import PublicRoute from '@/components/Route/PublicRoute';

const ProgressPage = loadable(
  () => import(/* webpackChunkName: "share-react-progress" */ './ProgressPage/Container'),
  {
    fallback: <LoaderLoadable />,
    ssr: false,
  },
);

const DonePage = loadable(
  () => import(/* webpackChunkName: "share-react-done" */ './DonePage/Container'),
  {
    fallback: <LoaderLoadable />,
    ssr: false,
  },
);

const InvitePage = loadable(
  () => import(/* webpackChunkName: "share-react-invite" */ './InvitePage/Container'),
  {
    fallback: <LoaderLoadable />,
    ssr: false,
  },
);

const PersonalPage = loadable(
  () => import(/* webpackChunkName: "share-react-invite-personal" */ './PersonalPage/Container'),
  {
    fallback: <LoaderLoadable />,
    ssr: false,
  },
);

const Reshare = loadable(
  () => import(/* webpackChunkName: "share-react-invite-reshare" */ './Reshare'),
  {
    fallback: <LoaderLoadable />,
    ssr: false,
  },
);

function Sharereact() {
  const match = useRouteMatch();
  const { path } = match;

  return (
    <Switch>
      <PrivateRoute exact path={`${path}/progress`} component={ProgressPage} />
      <PrivateRoute path={`${path}/done`} component={DonePage} />
      <PrivateRoute path={`${path}/reshare`} component={Reshare} />
      <PublicRoute path={`${path}/invite`} component={InvitePage} />
      <PublicRoute path={`${path}/personal`} component={PersonalPage} />
    </Switch>
  );
}

export default Sharereact;
