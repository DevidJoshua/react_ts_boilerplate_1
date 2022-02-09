import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useUserData } from '@/context/userData';
import useOrderDetail from '@routes/OrderHistory/hooks/useOrderDetail';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import LoaderLoadable from '@/components/LoaderLoadable';

import OrderStatus from '../OrderStatus';
import OrderProduct from '../OrderProduct';

import { MAPPING_STATUS } from '../../constant';

function OrderDetail() {
  const history = useHistory();
  const params = useParams<{ id: string; idLogistic: string }>();

  const { id, idLogistic } = params;

  const {
    userInfo: { token },
  } = useUserData();
  const { getOrderDetail, loading, dataOrderDetail } = useOrderDetail();

  useEffect(() => {
    getOrderDetail(token, id);
  }, [getOrderDetail, id, token]);

  const getDataProduct = useMemo(() => {
    return dataOrderDetail?.order_logistics.find(val => val.id === Number(idLogistic));
  }, [dataOrderDetail?.order_logistics, idLogistic]);

  const getOrderStatus = useMemo(() => {
    return (
      MAPPING_STATUS.find(val => val.code.includes(getDataProduct?.logisticStatus || null))?.text ||
      ''
    );
  }, [getDataProduct?.logisticStatus]);

  if (loading) {
    return <LoaderLoadable />;
  }

  return (
    <>
      <TopNav title="Dikirim" onBack={() => history.push('/order-history/list')} />

      <Flex margin="32px 16px">
        <OrderStatus status={getOrderStatus} />
      </Flex>

      <OrderProduct itemProducts={loading ? [] : getDataProduct?.package.items} />
    </>
  );
}

export default OrderDetail;
