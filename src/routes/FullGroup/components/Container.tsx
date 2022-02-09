import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import useWaitingFriend from '@routes/WaitingFriend/hooks/useWaitingFriend';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import BottomNav from '@/components/BottomNav/components';
import Modal from '@/components/Modal';
import LoaderLoadable from '@/components/LoaderLoadable';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FullImage from '@/assets/icon-bored.png';
import ImgSuccessPayment from '@/assets/success-icon.png';

function Container() {
  const history = useHistory();
  const { location } = history;
  const { search } = location;

  const [showPayment, setShowPayment] = useState<boolean>(false);

  const getPayment = queryString.parse(search)?.payment || '';
  const getGroupID = queryString.parse(search)?.group || '';
  const getFromShare = queryString.parse(search)?.from || '';

  const isFromShare = getFromShare === 'share';
  const isPaymentSuccess = getPayment === 'success';

  const { getWaitingFriend, dataWaitingFriend, loading } = useWaitingFriend();

  useEffect(() => {
    if (isPaymentSuccess) {
      setShowPayment(true);
    }
  }, [isPaymentSuccess]);

  useEffect(() => {
    getWaitingFriend(String(getGroupID));
  }, [getGroupID, getWaitingFriend]);

  useEffect(() => {
    if (!getGroupID && !isFromShare) {
      history.replace('/');
    }
  }, [getGroupID, history, isFromShare]);

  const handleClosePayment = () => {
    setShowPayment(false);
    history.replace({
      pathname: location.pathname,
      search: queryString.stringify({
        group: getGroupID,
        from: getFromShare,
      }),
    });
  };

  if (loading) {
    return <LoaderLoadable />;
  }

  return (
    <>
      <TopNav title="react Bareng" onBack={() => history.push('/')} />

      <div style={{ paddingBottom: '150px' }}>
        <Flex alignItems="center" margin="28px 16px">
          <img src={FullImage} width="205" style={{ margin: '0 auto' }} />
        </Flex>

        {Boolean((dataWaitingFriend?.buyers_name || [])?.length > 0) && (
          <Flex flexDirection="row" alignItems="center" justifyContent="center">
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src="https://via.placeholder.com/32" />
              <Avatar alt="Travis Howard" src="https://via.placeholder.com/32" />
            </AvatarGroup>

            <Typography fontSize="16px" fontWeight="bold" style={{ marginLeft: '8px' }}>
              {dataWaitingFriend?.buyers_name?.join(' & ')} telah bergabung.
            </Typography>
          </Flex>
        )}

        {isFromShare && (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            margin="22px 16px 0"
          >
            <Typography fontSize="16px" fontWeight="bold" style={{ marginBottom: '8px' }}>
              Oops, group ini sudah lengkap.
            </Typography>
            <Typography fontSize="14px" align="center">
              Tenang, kamu bisa tetap berbelanja sendiri atau membuat group baru untuk mendapatkan
              harga potongan.
            </Typography>
          </Flex>
        )}

        <Flex margin="22px 16px 30px">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={() => history.push('/')}
          >
            Buat Group
          </Button>
          <div style={{ padding: '0 6px' }} />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            onClick={() => history.push('/group')}
          >
            Join Group
          </Button>
        </Flex>

        <BottomNav />
      </div>

      <Modal withBackground open={showPayment} onClose={handleClosePayment}>
        <Flex flexDirection="column" justifyContent="center">
          <img
            src={ImgSuccessPayment}
            width="158px"
            alt="success"
            style={{ margin: '0 auto', display: 'block' }}
          />
          <Typography fontSize="16px" textAlign="center" margin="24px 0 30px">
            Kami telah menerima pembayaran kamu, tingkatkan terus pembelian agar mendapat Token
            tambahan.
          </Typography>
          <Button size="large" variant="contained" color="primary" onClick={handleClosePayment}>
            Baiklah
          </Button>
        </Flex>
      </Modal>
    </>
  );
}

export default Container;
