import React from 'react';
import loadable from '@loadable/component';
import Loader from './Loader';

const Container = loadable(() => import(/* webpackChunkName: "category-menu" */ './Category'), {
  fallback: <Loader />,
  ssr: false,
});

export default Container;
