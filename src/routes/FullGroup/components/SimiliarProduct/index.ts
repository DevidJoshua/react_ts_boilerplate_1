import loadable from '@loadable/component';

const Similiar = loadable(
  () => import(/* webpackChunkName: "full-group-similiar-product" */ './Container'),
);

export default Similiar;
