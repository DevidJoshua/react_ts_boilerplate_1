import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import { useHistory } from 'react-router-dom';
import { useUserData } from '@/context/userData';
import useWaiting from '@routes/Waiting/hooks/useWaiting';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import BottomNav from '@/components/BottomNav/components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@components/Modal';
import LoaderLoadable from '@/components/LoaderLoadable';

import CountDown from './CountDown';
import Share from './Share';

import ImgSuccessPayment from '@/assets/success-icon.png';

function Container() {
  const history = useHistory();
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const { location } = history;
  const { search } = location;

  const getPayment = queryString.parse(search)?.payment || '';
  const getOrderNumber = queryString.parse(search)?.order || '';
  const isPaymentSuccess = getPayment === 'success';

  const {
    userInfo: { token },
  } = useUserData();
  const { getWaiting, dataWaiting, loading } = useWaiting();

  useEffect(() => {
    if (isPaymentSuccess) {
      setShowPayment(true);
    }
  }, [isPaymentSuccess]);

  useEffect(() => {
    getWaiting(token, String(getOrderNumber));
  }, [getOrderNumber, getWaiting, token]);

  useEffect(() => {
    if (!getOrderNumber) {
      history.replace('/');
    }
  }, [getOrderNumber, history]);

  useEffect(() => {
    if (!loading && dataWaiting?.flagFullGroup) {
      history.push({
        pathname: '/full-group',
        search: queryString.stringify({
          payment: getPayment,
          group: dataWaiting?.group_order_id,
          from: 'waiting',
        }),
      });
    }
  }, [dataWaiting?.flagFullGroup, dataWaiting?.group_order_id, getPayment, history, loading]);

  const handleShowShare = () => {
    setShowShare(true);
  };

  const handleCloseShare = () => {
    setShowShare(false);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    history.replace({
      pathname: location.pathname,
      search: queryString.stringify({
        order: getOrderNumber,
      }),
    });
  };

  if (loading) {
    return <LoaderLoadable />;
  }

  return (
    <>
      <TopNav title="Menunggu" onBack={() => history.push('/')} />
      <div style={{ paddingBottom: '100px' }}>
        <CountDown dataWaiting={dataWaiting} />

        <div style={{ margin: '22px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ marginBottom: '8px' }}
            onClick={handleShowShare}
          >
            Bagikan Group
          </Button>
        </div>

        <BottomNav />
      </div>

      <Share
        display={showShare}
        onClose={handleCloseShare}
        token={token}
        groupID={dataWaiting?.group_order_id || 0}
      />

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
