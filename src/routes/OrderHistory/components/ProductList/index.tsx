import React from 'react';
import loadable from '@loadable/component';

const Container = loadable(
  () => import(/* webpackChunkName: "order-history-list" */ './Container'),
  {
    fallback: <></>,
    ssr: false,
  },
);

export default Container;
