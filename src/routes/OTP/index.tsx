import React from 'react';
import loadable from '@loadable/component';

const Container = loadable(() => import(/* webpackChunkName: "otp" */ './components/Container'), {
  fallback: <></>,
  ssr: false,
});

export default Container;
