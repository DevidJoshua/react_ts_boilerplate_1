import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import useChallengeStatus from '@routes/Sharereact/hooks/useChallengeStatus';

import LoaderLoadable from '@components/LoaderLoadable';
import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import BottomNav from '@/components/BottomNav/components';
import Avatar from '@mui/material/Avatar';

import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import ImgGift from '@/assets/gift.png';
import ImgProfile from '@/assets/dummy-profile.png';

import ClaimProductList from './ClaimProduct';
import { styBoxShare, styBoxContent } from '../styles';

function ContainerDone() {
  const history = useHistory();

  const getRefNo = queryString.parse(history.location.search)?.ref || '';

  const { getChallengeStatus, dataChallengeStatus, loading } = useChallengeStatus();

  useEffect(() => {
    getChallengeStatus(String(getRefNo));
  }, [getChallengeStatus, getRefNo]);

  useEffect(() => {
    if (
      !loading &&
      (!getRefNo ||
        (dataChallengeStatus?.userChallengeDetails?.isAchieve &&
          dataChallengeStatus?.userChallengeDetails?.isDisbursed))
    ) {
      history.replace('/');
    }
  }, [
    dataChallengeStatus?.userChallengeDetails?.isAchieve,
    dataChallengeStatus?.userChallengeDetails?.isDisbursed,
    getRefNo,
    history,
    loading,
  ]);

  const getActualValue = dataChallengeStatus?.userChallengeDetails?.actualValue || 0;
  const getMaxValue = dataChallengeStatus?.userChallengeDetails?.maxValue || 0;

  const normalise = (value: number) => ((value - 0) * 100) / (getMaxValue - 0);

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
                Selamat kamu berhasil mendapatkan Produk Gratis!
              </Typography>
            </Flex>

            <Flex flexDirection="column" width="100%">
              <LinearProgress
                style={{ width: '100%' }}
                variant="determinate"
                value={normalise(getActualValue)}
              />

              <Flex style={{ alignSelf: 'flex-end' }} margin="8px 0 0">
                <Typography fontSize="16px" fontWeight="bold" style={{ color: '#6770E6' }}>
                  {getActualValue}/<span style={{ color: '#DFE1E3' }}>{getMaxValue}</span>
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </div>

        <ClaimProductList refNo={String(getRefNo)} />

        <BottomNav />
      </div>
    </>
  );
}

export default ContainerDone;
