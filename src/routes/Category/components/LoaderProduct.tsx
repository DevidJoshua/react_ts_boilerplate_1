import React, { memo } from 'react';
import Flex from '@components/Flex';
import Skeleton from '@mui/material/Skeleton';
import { styItemProduct } from '../components/ProductList/styles';

function LoaderProduct() {
  return (
    <div>
      {[0, 1].map(val => (
        <div className={styItemProduct} key={val}>
          <Flex alignItems="center" justifyContent="center" margin="0 0 12px">
            <Skeleton variant="rectangular" width={125} height={125} />
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <div>
              <Skeleton variant="text" width={138} />
              <Skeleton variant="text" width={100} />
            </div>
            <Skeleton variant="rectangular" width={91} height={31} />
          </Flex>
        </div>
      ))}
    </div>
  );
}

export default memo(LoaderProduct);
