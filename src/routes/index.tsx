import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layouts from '@/components/Layouts';
import PrivateRoute from '@/components/Route/PrivateRoute';
import PublicRoute from '@/components/Route/PublicRoute';
import CustomRoute from '@/components/Route/CustomRoute';

import Home from '@routes/Home';
import Groups from '@routes/Groups';
import Checkout from '@routes/Checkout';
import Waiting from '@routes/Waiting';
import WaitingFriend from '@routes/WaitingFriend';
import FullGroup from '@routes/FullGroup';
import Category from '@routes/Category';
import Login from '@routes/Login';
import OTP from '@routes/OTP';
import Profile from '@routes/Profile';
import OrderHistory from '@routes/OrderHistory';
import Refund from '@routes/Refund';
import Address from '@routes/Address';
import Cart from '@routes/Cart';
import Sharereact from '@routes/Sharereact';
import Tokens from '@routes/Tokens';
import Register from '@routes/Register';
import SuccessPayment from '@routes/SuccessPayment';
import Notification from '@routes/Notification';
import Search from '@routes/Search';
import ErrorView from '@components/ErrorView';

function Routes() {
  const renderRoute = (() => {
    return (
      <Switch>
        <CustomRoute exact path="/" component={Home} />

        <PrivateRoute path="/address" component={Address} />

        <PrivateRoute exact path="/cart" component={Cart} />
        <CustomRoute exact path="/category/:categoryID" component={Category} />
        <CustomRoute exact path="/category/:categoryID/:subCategoryId" component={Category} />

        <PrivateRoute exact path="/full-group" component={FullGroup} />

        <PrivateRoute exact path="/group" component={Groups} />

        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/notification" component={Notification} />

        <PrivateRoute path="/checkout" component={Checkout} />
        <PrivateRoute path="/order-history" component={OrderHistory} />
        <Route exact path="/otp" component={OTP} />

        <PrivateRoute exact path="/payment-success" component={SuccessPayment} />
        <PrivateRoute exact path="/profile" component={Profile} />

        <PrivateRoute exact path="/refund" component={Refund} />
        <PublicRoute exact path="/register" component={Register} />

        <Route path="/share-react" component={Sharereact} />
        <Route path="/search" component={Search} />

        <PrivateRoute path="/tokens" component={Tokens} />

        <PrivateRoute exact path="/waiting" component={Waiting} />
        <Route exact path="/waiting-friend" component={WaitingFriend} />
        <Route path="/*" component={ErrorView} />
      </Switch>
    );
  })();

  return <Layouts>{renderRoute}</Layouts>;
}

const RootRoutes = () => <Route component={Routes} />;
export default RootRoutes;
