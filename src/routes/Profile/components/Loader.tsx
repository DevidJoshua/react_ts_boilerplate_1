import React, { memo } from 'react';
import Flex from '@components/Flex';
import Skeleton from '@mui/material/Skeleton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Loader() {
  return (
    <>
      <Flex
        alignItems="center"
        margin="32px 16px"
        padding="0 0 18px"
        style={{ borderBottom: 'thin solid #EDEDED' }}
      >
        <Skeleton variant="circular" width={50} height={45} />
        <Flex width="100%" justifyContent="space-between" alignItems="center" margin="0 0 0 8px">
          <Flex flexDirection="column">
            <Skeleton variant="text" width={100} height={15} />
            <Skeleton variant="text" width={150} height={15} />
          </Flex>
          <ChevronRightIcon />
        </Flex>
      </Flex>

      <Flex margin="0 16px 0" flexDirection="column">
        <Flex
          margin="18px 0 0"
          padding="0 0 18px"
          justifyContent="space-between"
          style={{ borderBottom: 'thin solid #EDEDED' }}
        >
          <Skeleton variant="text" width={100} height={15} />
          <ChevronRightIcon />
        </Flex>
        <Flex
          margin="18px 0 0"
          padding="0 0 18px"
          justifyContent="space-between"
          style={{ borderBottom: 'thin solid #EDEDED' }}
        >
          <Skeleton variant="text" width={100} height={15} />
          <ChevronRightIcon />
        </Flex>
        <Flex
          margin="18px 0 0"
          padding="0 0 18px"
          justifyContent="space-between"
          style={{ borderBottom: 'thin solid #EDEDED' }}
        >
          <Skeleton variant="text" width={100} height={15} />
          <ChevronRightIcon />
        </Flex>
      </Flex>
    </>
  );
}

export default memo(Loader);
