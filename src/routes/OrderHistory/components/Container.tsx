import React from 'react';
import { useHistory } from 'react-router-dom';

import TopNav from '@components/TopNav';
import BottomNav from '@components/BottomNav';
import ProductList from './ProductList';

function Container() {
  const history = useHistory();

  return (
    <>
      <TopNav title="Pesanan Kamu" onBack={() => history.push('/profile')} />

      <div style={{ paddingBottom: '100px' }}>
        <ProductList />

        <BottomNav />
      </div>
    </>
  );
}

export default Container;
