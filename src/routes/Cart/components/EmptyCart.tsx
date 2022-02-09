import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Flex from '@components/Flex';
import ImgEmptyState from '@/assets/empty-state-global.png';

function EmptyCart() {
  const history = useHistory();

  return (
    <Flex flexDirection="column" alignItems="center" margin="0 16px">
      <Flex flexDirection="column" alignItems="center" margin="0 0 32px">
        <Flex alignItems="center" justifyContent="center" margin="0 0 16px">
          <img src={ImgEmptyState} alt="empty cart" width="250" />
        </Flex>
        <Typography fontSize="16px" fontWeight="bold">
          Belum ada barang yang dipilih
        </Typography>
        <Typography fontSize="14px">Yuk, cek barang dulu.</Typography>
      </Flex>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={() => history.replace('/')}
      >
        Cari Barang
      </Button>
    </Flex>
  );
}

export default memo(EmptyCart);
