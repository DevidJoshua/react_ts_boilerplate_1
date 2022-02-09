import React from 'react';
import { useHistory } from 'react-router-dom';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ImgProfile from '@/assets/dummy-profile.png';

import { styBoxShare, styBoxContent } from '../styles';

function PersonalInvite() {
  const history = useHistory();

  const handleClickRegister = () => {
    history.push('/register');
  };

  return (
    <>
      <TopNav title="react Bareng" onBack={() => history.goBack()} />
      <div className={styBoxShare}>
        <Flex
          className={styBoxContent}
          flexDirection="column"
          alignItems="center"
          padding="16px 30px"
        >
          <Avatar src={ImgProfile} />

          <Typography
            fontSize="16px"
            fontWeight="bold"
            textAlign="center"
            style={{ marginTop: '10px', marginBottom: '16px' }}
          >
            Daftar & Bagikan react, dapatkan Produk Gratis!
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleClickRegister}
          >
            Daftar Yuk
          </Button>
        </Flex>
      </div>
    </>
  );
}

export default PersonalInvite;
