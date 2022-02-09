import React from 'react';
import { useHistory } from 'react-router-dom';
import toIDR from '@/helpers/toIDR';

import TopNav from '@components/TopNav';
import BottomNav from '@/components/BottomNav';
import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';

import { useUserData } from '@/context/userData';

import ImgToken from '@/assets/icon-token.png';
import ProductList from './ProductList';
import { styContainer } from './styles';

function Tokens() {
  const history = useHistory();

  const {
    userInfo: {
      moreUserInfo: { rewardPoint },
    },
  } = useUserData();

  return (
    <>
      <TopNav title="Token Kamu" onBack={() => history.goBack()} />
      <div style={{ paddingBottom: '100px' }}>
        <div className={styContainer}>
          <Flex
            alignItems="flex-start"
            justifyContent="center"
            style={{
              position: 'absolute',
              left: '48%',
              top: '48%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <img src={ImgToken} width="42px" />
            <Flex flexDirection="column">
              <Typography fontSize="32px" fontWeight="bold" style={{ color: '#421EB7' }}>
                {toIDR(rewardPoint, false)}
              </Typography>
              <Typography
                fontSize="14px"
                fontWeight="bold"
                style={{ color: '#421EB7' }}
                textAlign="center"
              >
                Token
              </Typography>
            </Flex>
          </Flex>
        </div>

        <Flex
          padding="10px 0"
          alignItems="center"
          justifyContent="center"
          width="250px"
          margin="-60px auto 0"
          style={{
            backgroundColor: '#F6F8F9',
            boxShadow: '2px 2px 15px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            position: 'relative',
          }}
        >
          <InfoIcon style={{ color: '#A2B5C8', marginRight: '12px' }} />
          <Typography fontSize="12px" color="primary">
            Tukar token kamu dengan produk
          </Typography>
        </Flex>

        <ProductList myToken={rewardPoint} />

        <BottomNav />
      </div>
    </>
  );
}

export default Tokens;
