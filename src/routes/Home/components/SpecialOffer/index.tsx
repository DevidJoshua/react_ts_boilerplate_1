import React from 'react';
import LoaderProduct from '@components/ProductCard/Loader';
import loadable from '@loadable/component';

const Container = loadable(
  () => import(/* webpackChunkName: "home-special-offer" */ './Container'),
  {
    fallback: (
      <div style={{ marginTop: '12px' }}>
        <LoaderProduct />
      </div>
    ),
    ssr: false,
  },
);

export default Container;
