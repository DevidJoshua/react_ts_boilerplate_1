import React, { FC, createContext, useEffect, useMemo, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAuth } from '../Auth';

import lsSet from '@/helpers/client-storage/localStorageSet';
import lsGet from '@/helpers/client-storage/localStorageGet';

import Flex from '@components/Flex';
import Modal from '@/components/Modal';
import useGetProductFree from '@/routes/Sharereact/hooks/useGetProductFree';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ImgPopup from '@/assets/free-product.png';
import ProductFree from '@routes/Home/components/PopupFreeProduct/ProductFree';
import { styBoxPurple, styBoxmodal } from '@routes/Home/components/PopupFreeProduct/styles';

dayjs.extend(utc);

const ShareContext = createContext({});

const ShareProvider: FC = ({ children }) => {
  const [showModalClaim, setShowModalClaim] = useState<boolean>(false);

  const {
    userData: { challengeDetails },
  } = useAuth();
  const { getProductFree, dataProductFree } = useGetProductFree();

  const getLSPopDone = lsGet({ key: 'react-pop-done-uid' });

  const getExistChallenge = useMemo(() => {
    const filterDataChallenge = challengeDetails.filter(
      val => val.expiredTime !== null || dayjs().isBefore(dayjs(val.expiredTime).utc()),
    );

    if (filterDataChallenge.length > 0) {
      return (
        filterDataChallenge.find(val => dayjs().isBefore(dayjs(val.expiredTime).utc()))
          ?.refChallengeNo || ''
      );
    }

    return '';
  }, [challengeDetails]);

  useEffect(() => {
    getProductFree();
  }, [getProductFree]);

  useEffect(() => {
    const getSelectedChallenge = challengeDetails.find(
      val => val.refChallengeNo === getExistChallenge,
    );

    if (
      !getLSPopDone &&
      getSelectedChallenge?.isAchieve &&
      getSelectedChallenge?.isDisbursed === false
    ) {
      setShowModalClaim(true);
    }
  }, [challengeDetails, getExistChallenge, getLSPopDone]);

  const handleCloseModal = useCallback(() => {
    lsSet({ key: 'react-pop-done-uid', value: true });
    setShowModalClaim(false);
  }, []);

  const handleClaimGift = useCallback(() => {
    lsSet({ key: 'react-pop-done-uid', value: true });

    window.location.replace(`/share-react/done?ref=${getExistChallenge}`);
  }, [getExistChallenge]);

  return (
    <ShareContext.Provider value={{}}>
      {children}
      <Modal open={showModalClaim} onClose={handleCloseModal}>
        <div className={styBoxmodal}>
          <Flex flexDirection="column" justifyContent="center">
            <img src={ImgPopup} />

            <div className={styBoxPurple} style={{ margin: '0 0 12px' }}>
              <Typography color="secondary" fontSize="14px" fontWeight="bold">
                Selamat, Kamu mendapatkan produk gratis!!
              </Typography>
            </div>

            <ProductFree dataProduct={dataProductFree} />

            <Button
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClaimGift}
            >
              Klaim Hadiah
            </Button>
          </Flex>
        </div>
      </Modal>
    </ShareContext.Provider>
  );
};

export default ShareProvider;
