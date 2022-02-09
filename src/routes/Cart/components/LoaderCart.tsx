import React, { memo } from 'react';
import Flex from '@components/Flex';
import Skeleton from '@mui/material/Skeleton';
import { styItemCart } from './styles';

function LoaderCart() {
  return (
    <Flex alignItems="center" padding="24px 16px" className={styItemCart}>
      <Skeleton variant="rectangular" width={105} height={115} />
      <Flex flexDirection="column" margin="0 0 0 16px" width="100%">
        <Skeleton variant="text" width={140} height={15} />
        <Skeleton variant="text" width={100} height={15} />

        <Flex margin="8px 0 0">
          <Skeleton variant="rectangular" width={64} height={35} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default memo(LoaderCart);
