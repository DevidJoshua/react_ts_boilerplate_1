import React from 'react';
import loadable from '@loadable/component';

const Container = loadable(() => import(/* webpackChunkName: "bottom-nav" */ './components'), {
  fallback: <></>,
  ssr: false,
});

export default Container;
