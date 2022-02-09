import React from 'react';
import loadable from '@loadable/component';

const Container = loadable(() => import(/* webpackChunkName: "top-nav" */ './components'), {
  fallback: <></>,
  ssr: false,
});

export default Container;
