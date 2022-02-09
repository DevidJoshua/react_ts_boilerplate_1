import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { API_HOST, HOSTNAME } from '@config';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import fetcher from '@/helpers/fetcher';
import { useUserData } from '@/context/userData';
import useChallengeStatus from '@routes/Sharereact/hooks/useChallengeStatus';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import LoaderLoadable from '@/components/LoaderLoadable';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ImgProfile from '@/assets/dummy-profile.png';

import BoxProgress from './BoxProgress';
import JoiningFriend from './JoiningFriend';
import Share from '../Share';
import { styBoxShare, styBoxContent } from '../styles';

dayjs.extend(utc);

const API_CREATE_CHALLENGE = `${API_HOST}mgmnew`;

interface CreateChallengeResponse {
  landingEndPoint: string;
  checkChallengeStatusEndPoint: string;
  updateChallengeProgressEndPoint: string;
  disburseRewardEndPoint: string;
}

function ContainerProgress() {
  const history = useHistory();

  const [displayShare, setDisplayShare] = useState<boolean>(false);
  const [loadingCreateChallenge, setLoadingCreateChallenge] = useState<boolean>(false);
  const [urlShare, setUrlShare] = useState<string>('');

  const {
    loading,
    userInfo: {
      token,
      profileID,
      moreUserInfo: { challengeDetails },
    },
  } = useUserData();

  const {
    getChallengeStatus,
    dataChallengeStatus,
    loading: loadingChallengeStatus,
  } = useChallengeStatus();

  const isExpiredChallenge = useMemo(
    () =>
      challengeDetails.every(
        val =>
          val.expiredTime === null ||
          dayjs().isAfter(dayjs(val.expiredTime).utc().format('DD MMM YYYY HH:mm')),
      ),
    [challengeDetails],
  );

  const getExistChallenge = useMemo(() => {
    const filterDataChallenge = challengeDetails.filter(
      val =>
        val.expiredTime !== null ||
        dayjs().isBefore(dayjs(val.expiredTime).utc().format('DD MMM YYYY HH:mm')),
    );

    if (filterDataChallenge.length > 0) {
      return (
        filterDataChallenge.find(val =>
          dayjs().isBefore(dayjs(val.expiredTime).utc().format('DD MMM YYYY HH:mm')),
        )?.refChallengeNo || ''
      );
    }

    return '';
  }, [challengeDetails]);

  const createChallenge = useCallback(async () => {
    setLoadingCreateChallenge(true);
    try {
      await fetcher(API_CREATE_CHALLENGE, {
        method: 'POST',
        token,
        body: JSON.stringify({
          user_profile: Number(profileID),
          landingPageUrl: `${HOSTNAME}share-react/invite`,
        }),
      }).then((response: CreateChallengeResponse) => {
        if (response.landingEndPoint) {
          const getRefNo = response.landingEndPoint.replace('refNo', 'ref');
          setUrlShare(`${getRefNo}&type=sc`);

          setTimeout(() => {
            const getIndex = getRefNo.indexOf('ref');
            const refNo = getRefNo.substring(getIndex + 4);
            getChallengeStatus(refNo);
          }, 2000);
        }
        setLoadingCreateChallenge(false);
      });
    } catch (error) {
      setLoadingCreateChallenge(false);
      console.warn(error);
    }
  }, [getChallengeStatus, profileID, token]);

  useEffect(() => {
    if (!loading) {
      if (challengeDetails.length === 0 || isExpiredChallenge) {
        createChallenge();
      } else {
        getChallengeStatus(getExistChallenge);
        setUrlShare(`${HOSTNAME}share-react/invite?ref=${getExistChallenge}&type=sc`);
      }
    }
  }, [
    challengeDetails.length,
    createChallenge,
    getChallengeStatus,
    getExistChallenge,
    isExpiredChallenge,
    loading,
  ]);

  useEffect(() => {
    if (
      !loadingChallengeStatus &&
      dataChallengeStatus?.userChallengeDetails?.isAchieve &&
      dataChallengeStatus?.userChallengeDetails?.isDisbursed === false
    ) {
      history.replace({
        pathname: '/share-react/done',
        search: queryString.stringify({
          ref: getExistChallenge,
        }),
      });
    }
  }, [
    dataChallengeStatus.userChallengeDetails?.isAchieve,
    dataChallengeStatus.userChallengeDetails?.isDisbursed,
    getExistChallenge,
    history,
    loadingChallengeStatus,
  ]);

  useEffect(() => {
    if (
      !loadingChallengeStatus &&
      dataChallengeStatus?.userChallengeDetails?.isAchieve &&
      dataChallengeStatus?.userChallengeDetails?.isDisbursed
    ) {
      history.replace({
        pathname: '/share-react/reshare',
        search: queryString.stringify({
          ref: getExistChallenge,
        }),
      });
    }
  }, [
    dataChallengeStatus?.userChallengeDetails?.isAchieve,
    dataChallengeStatus?.userChallengeDetails?.isDisbursed,
    getExistChallenge,
    history,
    loadingChallengeStatus,
  ]);

  const handleCloseShare = () => {
    setDisplayShare(false);
  };

  if (
    loading ||
    loadingCreateChallenge ||
    (challengeDetails.length > 0 && loadingChallengeStatus)
  ) {
    return <LoaderLoadable />;
  }

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
            style={{ marginTop: '10px', marginBottom: '16px' }}
          >
            Bagikan react dan dapatkan Produk Gratis!
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={() => setDisplayShare(true)}
          >
            Bagikan react
          </Button>
        </Flex>
      </div>

      <BoxProgress dataChallengeStatus={dataChallengeStatus} />

      <JoiningFriend dataChallengeStatus={dataChallengeStatus} />

      <Share display={displayShare} onClose={handleCloseShare} urlShare={urlShare} token={token} />
    </>
  );
}

export default ContainerProgress;
