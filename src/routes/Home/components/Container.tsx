import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import lsGet from '@/helpers/client-storage/localStorageGet';

import { useUserData } from '@/context/userData';
import useGetListAddress from '@routes/Address/hooks/useGetListAddress';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RoomIcon from '@mui/icons-material/Room';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import BottomNav from '@components/BottomNav';
import PopupFreeProduct from './PopupFreeProduct';
import CategorySection from './Category';
import SpecialOfferSection from './SpecialOffer';
import TokenSection from './Token';
import BannerSection from './Banner';

import { styWrapWelcome, styDefaultAddr } from './styles';

function Container() {
  const history = useHistory();
  const [showPopNonRegis, setShowPopNonRegis] = useState<boolean>(false);
  const [showPopRegis, setShowPopRegis] = useState<boolean>(false);

  const {
    location: { search },
  } = history;
  const qs = queryString.parse(search);
  const getFromRegist = qs?.from || '';

  const {
    userInfo: {
      token,
      profileID,
      moreUserInfo: { rewardPoint },
    },
    isLoggedIn,
  } = useUserData();

  const { getAddress, dataAddress, loading } = useGetListAddress();

  const getLSNonLogin = lsGet({ key: 'react-pop-nonregist-uid' });
  const getLSLogin = lsGet({ key: 'react-pop-regist-uid' });

  useEffect(() => {
    if (!isLoggedIn && !getLSNonLogin) {
      setShowPopNonRegis(true);
    }
  }, [getLSNonLogin, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && getFromRegist === 'regis' && !getLSLogin) {
      setShowPopRegis(true);
    }
  }, [getFromRegist, getLSLogin, isLoggedIn]);

  useEffect(() => {
    if (profileID) {
      getAddress({ token, profileID });
    }
  }, [getAddress, profileID, token]);

  const renderAddress = useMemo(() => {
    const isAddress = dataAddress.length > 0;

    if (!loading) {
      if (isAddress) {
        const addressType = dataAddress.find(val => val.isDefault)?.addrType || '';

        if (!addressType) {
          return (
            <Typography
              fontWeight="normal"
              fontSize="12px"
              color="secondary"
              onClick={() => history.push('/address/list')}
            >
              Pilih alamat utama
            </Typography>
          );
        }

        return (
          <Flex onClick={() => history.push('/address/list')}>
            <Typography fontWeight="normal" fontSize="12px" color="secondary">
              &nbsp;Dikirim ke&nbsp;
            </Typography>
            <Typography fontWeight="bold" fontSize="12px" color="secondary">
              {addressType}
            </Typography>
          </Flex>
        );
      }

      return (
        <Typography
          fontWeight="normal"
          fontSize="12px"
          color="secondary"
          onClick={() => history.push('/address/choose-location')}
        >
          Tambah Alamat
        </Typography>
      );
    }

    return <Skeleton variant="text" width={50} color="secondary" />;
  }, [dataAddress, history, loading]);

  return (
    <>
      <TopNav isSearchNotif />
      <div className={styWrapWelcome}>
        <Typography fontWeight="bold" fontSize="12px" color="secondary">
          Selamat Datang di react!
        </Typography>

        <div className={styDefaultAddr}>
          <RoomIcon
            color="secondary"
            style={{
              width: '14px',
              height: '14px',
            }}
          />
          {renderAddress}
          <ChevronRightIcon
            color="secondary"
            style={{
              width: '14px',
              height: '14px',
            }}
          />
        </div>
      </div>

      <CategorySection />
      {isLoggedIn && Boolean(rewardPoint) && <TokenSection rewardToken={rewardPoint} />}

      <BannerSection />
      <SpecialOfferSection />

      {(showPopNonRegis || showPopRegis) && (
        <PopupFreeProduct isLoggedIn={isLoggedIn} isPopRegis={showPopRegis} />
      )}
      <BottomNav />
    </>
  );
}

export default Container;
