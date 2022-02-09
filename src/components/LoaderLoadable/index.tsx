import React from 'react';
import Flex from '../Flex';
import CircularProgress from '@mui/material/CircularProgress';

function LoaderLoadable() {
  return (
    <Flex alignItems="center" justifyContent="center" width="100%" height="100vh">
      <CircularProgress color="primary" />
    </Flex>
  );
}

export default LoaderLoadable;
