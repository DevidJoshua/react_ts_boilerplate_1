import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useUserData } from '@/context/userData';
import useHistoryList from '@routes/OrderHistory/hooks/useHistoryList';

import Flex from '@components/Flex';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoaderLoadable from '@/components/LoaderLoadable';

import ImgEmpty from '@/assets/empty-state-global.png';

import ProductItem from './ProductItem';

function ProductList() {
  const history = useHistory();

  const {
    userInfo: { token, profileID },
  } = useUserData();
  const { getOrderList, loading, dataOrderList } = useHistoryList();

  useEffect(() => {
    getOrderList(token, profileID);
  }, [getOrderList, profileID, token]);

  const renderOrderItem = () => {
    if (!loading && dataOrderList.length) {
      return dataOrderList.map(val => {
        return val.order_logistics.map((item, id) => {
          return (
            <ProductItem
              key={id}
              orderLogistic={item.logisticStatus}
              orderID={val.id}
              orderIDLogistic={item.id}
              orderExpiredTime={val.expiredTime}
              orderPaymentStatus={val.paymentStatus}
              productItems={item.package.items}
              orderDate={val.created_at}
              isFullGroup={val.flagFullGroup}
              orderNo={val.puchaseOrderNo}
              isGroupBuying={val.isGroupBuying}
              purchaseOrderB={val?.order_payment?.purchase_order_b}
              token={token}
            />
          );
        });
      });
    }

    return (
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <img src={ImgEmpty} alt="empty" />

        <Typography fontSize="16px" fontWeight="bold" marginTop="12px" marginBottom="32px">
          Oops, belum ada transaksi
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={() => history.push('/')}
        >
          react Bareng
        </Button>
      </Flex>
    );
  };

  if (loading) {
    return <LoaderLoadable />;
  }

  return (
    <Flex margin="32px 16px 0" flexDirection="column">
      <Typography fontWeight="bold" fontSize="16px">
        Belanjaan Kamu
      </Typography>

      <Flex margin="16px 0" flexDirection="column">
        {renderOrderItem()}
      </Flex>
    </Flex>
  );
}

export default ProductList;
