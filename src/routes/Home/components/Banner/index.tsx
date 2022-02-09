import React from 'react';
import loadable from '@loadable/component';

const Container = loadable(() => import(/* webpackChunkName: "home-banner" */ './Container'), {
  fallback: <></>,
  ssr: false,
});

export default Container;
