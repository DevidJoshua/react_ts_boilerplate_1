import React, { useEffect, useMemo } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import useFindChallengeDetail from '@routes/Sharereact/hooks/useFindChallengeDetail';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import BottomNav from '@/components/BottomNav/components';
import LoaderLoadable from '@/components/LoaderLoadable';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ImgProfile from '@/assets/dummy-profile.png';

import ProductFree from './ProductFree';
import { styBoxShare, styBoxContent } from '../styles';

const FROM_SHARE = 'sc';
const FROM_PERSONAL = 'fs';

function ContainerInvite() {
  const history = useHistory();
  const {
    location: { search },
  } = history;

  const getRefNumber = queryString.parse(search)?.ref || '';
  const getInviteType = queryString.parse(search)?.type || '';

  const { getChallengeDetail, dataChallengeDetail, loading } = useFindChallengeDetail();

  useEffect(() => {
    if (getRefNumber) {
      getChallengeDetail(String(getRefNumber));
    }
  }, [getChallengeDetail, getRefNumber]);

  useEffect(() => {
    if (!getRefNumber || getInviteType !== FROM_SHARE) {
      history.replace('/');
    }
  }, [getInviteType, getRefNumber, history]);

  useEffect(() => {
    if (!getRefNumber && getInviteType === FROM_PERSONAL) {
      history.replace('/share-react/personal');
    }
  }, [getInviteType, getRefNumber, history]);

  const handleClickRegister = () => {
    history.push({
      pathname: '/register',
      search: queryString.stringify({
        ref: getRefNumber,
      }),
    });
  };

  const getName = useMemo(
    () => dataChallengeDetail?.user_profile?.fullName || 'teman kamu',
    [dataChallengeDetail?.user_profile?.fullName],
  );

  if (loading) {
    return <LoaderLoadable />;
  }

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Ayo gabung sekarang juga, teman kamu sudah berpartisipasi loh, dapatkan hadiah menarik di react"
        />
        <title>react Invite Friend</title>
      </Helmet>
      <TopNav title="react Bareng" onBack={() => history.goBack()} />

      <div style={{ paddingBottom: '100px' }}>
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
              Yuk gabung bersama {getName} & dapatkan token dan produk gratis di react
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

        <ProductFree />

        <BottomNav />
      </div>
    </>
  );
}

export default ContainerInvite;
