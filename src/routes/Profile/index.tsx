import React from 'react';
import loadable from '@loadable/component';
import LoaderLoadable from '@/components/LoaderLoadable';

const Container = loadable(
  () => import(/* webpackChunkName: "profile" */ './components/Container'),
  {
    fallback: <LoaderLoadable />,
    ssr: false,
  },
);

export default Container;
