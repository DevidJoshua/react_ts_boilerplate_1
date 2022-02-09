import React, { memo } from 'react';
import Flex from '../Flex';
import Skeleton from '@mui/material/Skeleton';
import { styContainer, styContent, styContentProduct, styContentPrice } from './styles';

function LoaderProductCard() {
  return (
    <Flex margin="0 16px">
      {[0, 1].map(val => (
        <div className={styContainer} key={val}>
          <div className={styContent}>
            <Skeleton variant="rectangular" width={100} height={100} />

            <div className={styContentProduct}>
              <Skeleton variant="text" width={100} />
            </div>

            <div className={styContentPrice}>
              <div>
                <Skeleton variant="text" width={70} />

                <div style={{ display: 'flex' }}>
                  <Skeleton variant="text" width={50} />
                </div>
              </div>

              <Skeleton variant="rectangular" width={34} height={28} />
            </div>
          </div>
        </div>
      ))}
    </Flex>
  );
}

export default memo(LoaderProductCard);
