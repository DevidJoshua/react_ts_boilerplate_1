import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { HOSTNAME } from '@config';

import toIDR from '@/helpers/toIDR';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';

import CircularProgress from '@mui/material/CircularProgress';

import Flex from '@components/Flex';
import Timer from '@/components/Timer';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import usePayment from '@routes/OrderHistory/hooks/usePayment';

import { OrderLogisticResponse } from '@routes/OrderHistory/interface';
import { styStatusLabel, styStatusPending, styBgLoading } from './styles';
import { MAPPING_STATUS } from '../../constant';

dayjs.extend(dayjsPluginUTC);

interface Props {
  orderID: number;
  productItems: OrderLogisticResponse['package']['items'];
  orderLogistic: string;
  orderDate: string;
  orderIDLogistic: number;
  orderExpiredTime: string | null;
  orderPaymentStatus: string | null;
  isFullGroup: boolean | null;
  orderNo: string;
  token: string;
  isGroupBuying: boolean;
  purchaseOrderB: number;
}

function ProductItem(props: Props) {
  const history = useHistory();
  const {
    orderID,
    productItems,
    orderDate,
    orderLogistic,
    orderIDLogistic,
    isFullGroup,
    orderNo,
    orderExpiredTime,
    orderPaymentStatus,
    token,
    isGroupBuying,
    purchaseOrderB,
  } = props;

  const { onHandlePayment, loading } = usePayment();

  const formattedOrderDate = dayjs(orderDate).utc().format('DD-MM-YYYY');
  const isPaymentPending = orderPaymentStatus === 'pending';

  const getOrderStatus = useMemo(() => {
    return MAPPING_STATUS.find(val => val.code.includes(orderLogistic))?.text;
  }, [orderLogistic]);

  const getOrderName = useMemo(() => {
    return productItems.map(val => val.name).join(' + ');
  }, [productItems]);

  const getOrderPrice = useMemo(() => {
    let totalPrice = 0;
    productItems.forEach(val => {
      const total = val.qty * val.price;
      totalPrice += total;
    });
    return totalPrice;
  }, [productItems]);

  const handleClickOrderDetail = () => {
    if (isPaymentPending) {
      onHandlePayment(
        {
          token,
          orderID: String(purchaseOrderB),
          body: {
            callbacks: {
              finish: isGroupBuying
                ? `${HOSTNAME}waiting?payment=success&order=${orderNo}`
                : `${HOSTNAME}payment-success?type=1`,
            },
          },
        },
        params => {
          if (params.token && params.redirect_url) {
            window.location.href = params.redirect_url;
          }
        },
      );
    } else {
      if (isFullGroup === false) {
        history.push(`/waiting?order=${orderNo}`);
      } else if (isFullGroup === null || isFullGroup === true) {
        history.push(`detail/${orderID}/${orderIDLogistic}`);
      }
    }
  };

  const timeExpired = useMemo(() => {
    const formatted = dayjs(orderExpiredTime).utc().format('DD MMM YYYY HH:mm:ss');
    const parseDate = dayjs(formatted).valueOf();
    return parseDate;
  }, [orderExpiredTime]);

  const renderOrderStatus = useMemo(() => {
    if (isFullGroup || (isFullGroup === null && getOrderStatus !== null)) {
      return (
        <div className={styStatusLabel}>
          <Typography>{getOrderStatus}</Typography>
        </div>
      );
    }

    if (isPaymentPending) {
      return (
        <div className={styStatusPending}>
          <Typography fontSize="12px" textAlign="center" lineHeight="1">
            Menunggu Pembayaran
          </Typography>
        </div>
      );
    }

    return (
      <Flex flexDirection="column">
        <Typography fontSize="14px" textAlign="center" lineHeight="1" marginBottom="8px">
          Menunggu teman
        </Typography>
        <Timer date={timeExpired} variant="smallPurple" />
      </Flex>
    );
  }, [getOrderStatus, isFullGroup, isPaymentPending, timeExpired]);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="14px"
      margin="0 0 16px"
      style={{
        backgroundColor: '#F8F9FB',
        borderRadius: '8px',
        position: 'relative',
      }}
      onClick={handleClickOrderDetail}
    >
      {loading && (
        <div className={styBgLoading}>
          <CircularProgress />
        </div>
      )}
      <Flex>{renderOrderStatus}</Flex>
      <Flex alignItems="center" width="100%">
        <Flex flexDirection="column" width="100%" padding="0 0 0 12px">
          <Typography fontWeight="bold">{getOrderName}</Typography>
          <Typography style={{ margin: '4px 0 8px' }}>
            Pesanan tanggal {formattedOrderDate}
          </Typography>
          <Typography fontWeight="bold">{toIDR(getOrderPrice)}</Typography>
        </Flex>
        <ChevronRightIcon />
      </Flex>
    </Flex>
  );
}

export default ProductItem;
