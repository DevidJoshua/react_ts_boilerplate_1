import React from 'react';
import Loader from './Loader';
import loadable from '@loadable/component';

const Container = loadable(() => import(/* webpackChunkName: "home-category" */ './Container'), {
  fallback: <Loader />,
  ssr: false,
});

export default Container;
