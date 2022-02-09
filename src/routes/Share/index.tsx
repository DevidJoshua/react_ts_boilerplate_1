import React from 'react';
import loadable from '@loadable/component';
import LoaderLoadable from '@/components/LoaderLoadable';

const Container = loadable(() => import(/* webpackChunkName: "share-react" */ './components'), {
  fallback: <LoaderLoadable />,
  ssr: false,
});

export default Container;
