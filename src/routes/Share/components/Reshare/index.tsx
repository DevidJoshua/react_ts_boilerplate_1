import React, { useEffect, useMemo } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import useChallengeStatus from '@routes/Sharereact/hooks/useChallengeStatus';

import LoaderLoadable from '@components/LoaderLoadable';
import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import BottomNav from '@/components/BottomNav/components';
import Avatar from '@mui/material/Avatar';
import Timer from '@components/Timer';

import Typography from '@mui/material/Typography';

import ImgGift from '@/assets/gift.png';
import ImgProfile from '@/assets/dummy-profile.png';

import { styBoxShare, styBoxContent } from '../styles';

dayjs.extend(utc);

function Reshare() {
  const history = useHistory();

  const getRefNo = queryString.parse(history.location.search)?.ref || '';

  const { getChallengeStatus, dataChallengeStatus, loading } = useChallengeStatus();

  useEffect(() => {
    getChallengeStatus(String(getRefNo));
  }, [getChallengeStatus, getRefNo]);

  useEffect(() => {
    if (!getRefNo) {
      history.replace('/');
    }
  }, [getRefNo, history]);

  const timeExpired = useMemo(() => {
    const formatted = dayjs(dataChallengeStatus?.userChallengeDetails?.expiredTime)
      .utc()
      .format('DD MMM YYYY HH:mm:ss');
    const parseDate = dayjs(formatted).valueOf();
    return parseDate;
  }, [dataChallengeStatus?.userChallengeDetails?.expiredTime]);

  if (loading) {
    return <LoaderLoadable />;
  }

  return (
    <>
      <TopNav title="react Bareng" onBack={() => history.push('/')} />
      <div style={{ paddingBottom: '150px' }}>
        <div className={styBoxShare}>
          <Flex
            className={styBoxContent}
            flexDirection="column"
            alignItems="center"
            padding="16px 30px"
          >
            <Avatar src={ImgProfile} />

            <Flex alignItems="center">
              <img src={ImgGift} width="32px" />

              <Typography
                fontSize="16px"
                fontWeight="bold"
                style={{ marginTop: '10px', marginBottom: '16px', marginLeft: '12px' }}
              >
                Kamu sudah klaim gratis produk, tunggu sampai waktu selesai ya.
              </Typography>
            </Flex>

            <Timer date={timeExpired} variant="large" />
          </Flex>
        </div>

        <BottomNav />
      </div>
    </>
  );
}

export default Reshare;
