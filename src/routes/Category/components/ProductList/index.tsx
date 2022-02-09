import React from 'react';
import loadable from '@loadable/component';
import LoaderProduct from '../LoaderProduct';

const Container = loadable(
  () => import(/* webpackChunkName: "category-product-list" */ './Container'),
  {
    fallback: <LoaderProduct />,
    ssr: false,
  },
);

export default Container;
