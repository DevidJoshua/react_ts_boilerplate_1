import React, { memo } from 'react';
import Flex from '@components/Flex';
import Skeleton from '@mui/material/Skeleton';
import RoomIcon from '@mui/icons-material/Room';
import { styItemAddress } from './styles';

function Loader() {
  return (
    <div className={styItemAddress}>
      <Skeleton variant="text" width={100} height={15} />
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Flex alignItems="flex-start" margin="8px 0 0">
          <RoomIcon />
          <div className="detail-address">
            <Skeleton variant="text" width={200} height={15} />
          </div>
        </Flex>

        <Skeleton variant="rectangular" width={82} height={29} />
      </Flex>
    </div>
  );
}

export default memo(Loader);
