import React, { memo } from 'react';
import Typography from '@mui/material/Typography';

import Flex from '@components/Flex';
import ImgEmptyState from '@/assets/empty-state-global.png';

function EmptyGroup() {
  return (
    <Flex flexDirection="column" alignItems="center" margin="0 16px">
      <Flex flexDirection="column" alignItems="center" margin="0 0 32px">
        <Flex alignItems="center" justifyContent="center" margin="0 0 16px">
          <img src={ImgEmptyState} alt="empty cart" width="250" />
        </Flex>
        <Typography fontSize="16px" fontWeight="bold">
          Belum ada group yang tersedia
        </Typography>
      </Flex>
    </Flex>
  );
}

export default memo(EmptyGroup);
