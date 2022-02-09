import React from 'react';
import Typography from '@mui/material/Typography';

import ProductList from './ProductList';
import { styContainer } from './styles';

function SpecialOffer() {
  return (
    <div className={styContainer}>
      <Typography fontWeight="bold" color="primary" fontSize="16px">
        Penawaran Spesial
      </Typography>

      <ProductList />
    </div>
  );
}

export default SpecialOffer;
