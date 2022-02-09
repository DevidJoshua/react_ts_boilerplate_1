import React, { useMemo, useCallback } from 'react';
import normalizerSummaryCart from '@helpers/normalizerSummaryCart';

import Flex from '@components/Flex';

import Button from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

import { CartResponseInterface } from '@routes/Checkout/interface';
import { styFloatingButton } from './styles';
import toIDR from '@/helpers/toIDR';
interface Props {
  getCartFooter: () => void;
  onClickCheckout: (type: string, isContinueFromGroup: boolean) => void;
  dataCartFooter: CartResponseInterface['carts'];
  loadingCartFooter: boolean;
  loading?: boolean;
  isFromGroup?: boolean;
  isClaimToken?: boolean;
  isClaimFree?: boolean;
  myToken: number;
}

function LoaderFooter() {
  return (
    <div className={styFloatingButton}>
      <Skeleton variant="text" width={50} height={15} />

      <Flex flexDirection="row" alignItems="flex-start" justifyContent="space-between" width="100%">
        <div style={{ width: '50%', paddingRight: '4px' }}>
          <Flex margin="0 0 6px" alignItems="center">
            <PersonIcon style={{ color: '#565555', width: '20px', height: '20px' }} />
            <Skeleton variant="text" width={100} height={15} />
          </Flex>
          <Skeleton variant="rectangular" width={192} height={35} />
        </div>
        <div style={{ width: '50%', paddingLeft: '4px' }}>
          <Flex margin="0 0 6px" alignItems="center">
            <GroupIcon style={{ color: '#565555', width: '20px', height: '20px' }} />
            <Skeleton variant="text" width={100} height={15} />
          </Flex>
          <Skeleton variant="rectangular" width={192} height={35} />
        </div>
      </Flex>
    </div>
  );
}

function Footer(props: Props) {
  const {
    dataCartFooter,
    loadingCartFooter,
    onClickCheckout,
    loading = false,
    isFromGroup = false,
    isClaimToken,
    isClaimFree,
    myToken,
  } = props;

  const isDataCart = dataCartFooter.length > 0;

  const handleClickBuyGroup = useCallback(() => {
    onClickCheckout('group', isFromGroup);
  }, [isFromGroup, onClickCheckout]);

  const handleClickBuyPersonal = useCallback(() => {
    onClickCheckout('personal', false);
  }, [onClickCheckout]);

  const getSummary = useMemo(() => {
    return normalizerSummaryCart(dataCartFooter);
  }, [dataCartFooter]);

  const renderButton = useMemo(() => {
    if (isClaimToken) {
      return (
        <div style={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            loading={loading}
            disabled={!isDataCart || loading}
            onClick={() => onClickCheckout('claimToken', false)}
          >
            Klaim Produk
          </Button>
        </div>
      );
    }

    if (isClaimFree) {
      return (
        <div style={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            loading={loading}
            disabled={!isDataCart || loading}
            onClick={() => onClickCheckout('claimFree', false)}
          >
            Klaim Produk Gratis
          </Button>
        </div>
      );
    }

    return (
      <>
        {!isFromGroup && (
          <div style={{ width: '50%', paddingRight: '4px' }}>
            <Flex margin="0 0 6px" alignItems="center">
              <PersonIcon style={{ color: '#565555', width: '20px', height: '20px' }} />
              <Typography style={{ marginLeft: '6px' }} fontSize="16px">
                {toIDR(getSummary.totalPricePersonal)}
              </Typography>
            </Flex>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              loading={loading}
              disabled={!isDataCart || loading}
              onClick={handleClickBuyPersonal}
            >
              react Sendiri
            </Button>
          </div>
        )}
        <div
          style={{
            width: isFromGroup ? '100%' : '50%',
            ...(!isFromGroup && { paddingLeft: '4px' }),
          }}
        >
          <Flex margin="0 0 6px" alignItems="center">
            <GroupIcon style={{ color: '#565555', width: '20px', height: '20px' }} />
            <Typography style={{ marginLeft: '6px' }} fontWeight="bold" fontSize="16px">
              {toIDR(getSummary.totalPriceGroup)}
            </Typography>
          </Flex>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            loading={loading}
            disabled={!isDataCart || loading}
            onClick={handleClickBuyGroup}
          >
            react Bareng
          </Button>
        </div>
      </>
    );
  }, [
    getSummary.totalPriceGroup,
    getSummary.totalPricePersonal,
    handleClickBuyGroup,
    handleClickBuyPersonal,
    isClaimFree,
    isClaimToken,
    isDataCart,
    isFromGroup,
    loading,
    onClickCheckout,
  ]);

  if (loadingCartFooter) {
    return <LoaderFooter />;
  }

  return (
    <>
      <div className={styFloatingButton}>
        {isClaimFree ? (
          ''
        ) : isClaimToken ? (
          <Flex margin="0 0 8px">
            <Typography fontSize="14px">
              Token kamu: <strong>{toIDR(myToken, false)}</strong>
            </Typography>
          </Flex>
        ) : (
          <Typography fontSize="12px">Harga</Typography>
        )}

        <Flex
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="space-between"
          width="100%"
        >
          {renderButton}
        </Flex>
      </div>
    </>
  );
}

export default Footer;
