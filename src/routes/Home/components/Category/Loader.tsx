import React, { memo } from 'react';
import Flex from '@components/Flex';
import Skeleton from '@mui/material/Skeleton';
import { styContainer, styWrapItem } from './styles';
import { styItem } from './Item/styles';

function Loader() {
  const renderItem = () => {
    return [0, 1, 2, 3].map(val => {
      return (
        <div className={styItem} key={val}>
          <div className="cover">
            <Flex alignItems="center" justifyContent="center">
              <Skeleton variant="rectangular" width={24} height={24} />
            </Flex>
            <Skeleton variant="text" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styContainer}>
      <div className={styWrapItem}>{renderItem()}</div>
    </div>
  );
}

export default memo(Loader);
