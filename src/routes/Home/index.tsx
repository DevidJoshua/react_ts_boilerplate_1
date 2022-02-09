import React from 'react';
import LoaderLoadable from '@/components/LoaderLoadable';
import loadable from '@loadable/component';

const Container = loadable(() => import(/* webpackChunkName: "home" */ '@routes/Home/components'), {
  fallback: <LoaderLoadable />,
  ssr: false,
});

export default Container;
