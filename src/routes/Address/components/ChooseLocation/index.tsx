import React from 'react';
import loadable from '@loadable/component';

const Container = loadable(
  () => import(/* webpackChunkName: "address-choose-location" */ './Container'),
  {
    fallback: <></>,
    ssr: false,
  },
);

export default Container;
