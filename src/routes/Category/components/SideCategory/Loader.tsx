import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { styContainer, styItem } from './styles';

function Loader() {
  return (
    <div className={styContainer}>
      {[0, 1, 2, 3].map(val => (
        <div className={styItem} key={val}>
          <Skeleton variant="rectangular" width={24} height={24} />
          <Skeleton variant="text" width={30} />
        </div>
      ))}
    </div>
  );
}

export default Loader;
