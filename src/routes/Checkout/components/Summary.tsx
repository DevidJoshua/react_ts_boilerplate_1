import React, { useMemo } from 'react';
import Flex from '@components/Flex';

import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import normalizerSummaryCart from '@/helpers/normalizerSummaryCart';
import { OrderNumberResponse, CartResponseInterface } from '@routes/Checkout/interface';
import toIDR from '@/helpers/toIDR';

interface Props {
  dataOrderNumber: OrderNumberResponse;
  dataCartFooter: CartResponseInterface['carts'];
  loadingOrderNumber: boolean;
  loadingCartFooter: boolean;
  isClaimToken: boolean;
  isClaimFree: boolean;
}

function Summary(props: Props) {
  const { dataOrderNumber, dataCartFooter, loadingCartFooter, isClaimToken, isClaimFree } = props;

  const getSummary = useMemo(() => normalizerSummaryCart(dataCartFooter), [dataCartFooter]);

  const renderTotalPrice = () => {
    if (loadingCartFooter) {
      return (
        <Flex justifyContent="space-between">
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={80} height={15} />
        </Flex>
      );
    }

    return (
      <>
        <Flex justifyContent="space-between">
          <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            Total Harga ({getSummary.totalProduct} Barang)
          </Typography>

          <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            {toIDR(getSummary.totalPriceGroup)} {!isClaimToken && !isClaimFree && '(Bareng)'}
          </Typography>
        </Flex>
        {isClaimToken && (
          <Flex justifyContent="space-between">
            <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
              Token yang digunakan
            </Typography>

            <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
              {toIDR(getSummary.totalToken, false)} Token
            </Typography>
          </Flex>
        )}
      </>
    );
  };

  return (
    <div style={{ marginTop: '8px' }}>
      {renderTotalPrice()}
      <Flex justifyContent="space-between">
        <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          Total Ongkos Kirim
        </Typography>
        <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          {toIDR(0)}
        </Typography>
      </Flex>
      {Boolean(dataOrderNumber.orderNo) && (
        <Flex justifyContent="space-between" margin="8px 0 0">
          <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            Order No:
          </Typography>
          <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            {dataOrderNumber.orderNo}
          </Typography>
        </Flex>
      )}
      {Boolean(dataOrderNumber.orderSubmitted) && (
        <Flex justifyContent="space-between">
          <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            Order Submitted:
          </Typography>
          <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            {dataOrderNumber.orderSubmitted}
          </Typography>
        </Flex>
      )}
    </div>
  );
}

export default Summary;
