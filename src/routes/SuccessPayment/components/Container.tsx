import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import BottomNav from '@/components/BottomNav/components';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ImgSuccessPayment from '@/assets/success-icon.png';

function ContainerDone() {
  const history = useHistory();
  const {
    location: { search },
  } = history;

  const qs = queryString.parse(search);
  const getType = qs?.type || '';
  const isClaim = qs?.claim || '';

  useEffect(() => {
    if (getType !== '1' && !isClaim) {
      history.push('/');
    }
  }, [getType, history, isClaim]);

  useEffect(() => {
    if (!getType && isClaim !== 'true') {
      history.push('/');
    }
  }, [getType, history, isClaim]);

  return (
    <>
      <TopNav title="Status Pembayaran" onBack={() => history.push('/')} />
      <div style={{ paddingBottom: '100px' }}>
        <Flex flexDirection="column" justifyContent="center" margin="24px 16px 0">
          <img
            src={ImgSuccessPayment}
            width="158px"
            style={{ margin: '0 auto', display: 'block' }}
          />

          <Typography
            color="primary"
            fontWeight="bold"
            fontSize="18px"
            textAlign="center"
            margin="32px 0 16px"
          >
            {isClaim ? 'Klaim Produk Berhasil' : 'Pembayaran Berhasil'}
          </Typography>
          {!isClaim && (
            <Typography fontSize="16px" color="primary" textAlign="center" marginBottom="24px">
              Kami telah menerima pembayaran kamu, tingkatkan terus pembelian agar mendapat point
              tambahan.
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={isClaim ? () => history.push('/order-history/list') : () => history.push('/')}
          >
            {isClaim ? 'Lihat Pesanan Kamu' : 'Kembali Belanja'}
          </Button>
        </Flex>

        <BottomNav />
      </div>
    </>
  );
}

export default ContainerDone;
