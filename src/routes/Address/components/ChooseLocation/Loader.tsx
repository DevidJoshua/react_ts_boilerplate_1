import React, { memo } from 'react';
import Flex from '@components/Flex';
import RoomIcon from '@mui/icons-material/Room';
import Skeleton from '@mui/material/Skeleton';
import { styPin } from './styles';

function Loader() {
  return (
    <>
      <Flex width="100%" alignItems="flex-start">
        <div className={styPin}>
          <RoomIcon style={{ color: 'rgba(174, 207, 240, 0.25)', width: '16px', height: '16px' }} />
        </div>
        <Flex
          flexDirection="column"
          width="100%"
          margin="0 0 16px 8px"
          padding="0 0 16px"
          style={{ borderBottom: 'thin solid #EDEDED' }}
        >
          <Skeleton variant="text" width={80} height={15} />
          <Skeleton variant="text" width={180} height={15} />
        </Flex>
      </Flex>
      <Flex width="100%" alignItems="flex-start">
        <div className={styPin}>
          <RoomIcon style={{ color: 'rgba(174, 207, 240, 0.25)', width: '16px', height: '16px' }} />
        </div>
        <Flex
          flexDirection="column"
          width="100%"
          margin="0 0 16px 8px"
          padding="0 0 16px"
          style={{ borderBottom: 'thin solid #EDEDED' }}
        >
          <Skeleton variant="text" width={80} height={15} />
          <Skeleton variant="text" width={180} height={15} />
        </Flex>
      </Flex>
    </>
  );
}

export default memo(Loader);
