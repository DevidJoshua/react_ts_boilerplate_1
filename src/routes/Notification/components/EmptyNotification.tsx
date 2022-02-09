import React from 'react';
import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';
import ImgEmptyState from '@/assets/empty-state-global.png';

function EmptyNotification() {
  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <img src={ImgEmptyState} alt="empty notification" />

      <Typography
        fontSize="16px"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        marginTop="12px"
      >
        Belum ada notifikasi
      </Typography>
    </Flex>
  );
}

export default EmptyNotification;
