import React from 'react';
import Flex from '../Flex';
import CircularProgress from '@mui/material/CircularProgress';

function RouteLoader() {
  return (
    <Flex alignItems="center" justifyContent="center" width="100%" maxWidth="500px" height="100vh">
      <CircularProgress color="primary" />
    </Flex>
  );
}

export default RouteLoader;
