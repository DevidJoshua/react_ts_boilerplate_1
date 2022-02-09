import React from 'react';
import loadable from '@loadable/component';

const Container = loadable(
  () => import(/* webpackChunkName: "order-history-detail" */ './Container'),
  {
    fallback: <></>,
    ssr: false,
  },
);

export default Container;
