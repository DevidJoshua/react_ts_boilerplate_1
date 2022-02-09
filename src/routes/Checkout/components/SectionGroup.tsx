import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import lsGet from '@/helpers/client-storage/localStorageGet';

import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import {
  OrderNumberResponse,
  AddressResponse,
  CartResponseInterface,
} from '@routes/Checkout/interface';

import ShippingSection from './Shipping';
import SummarySection from './Summary';
import { stySectionGroup, styDivider } from './styles';

interface Props {
  dataAddress: AddressResponse[];
  dataOrderNumber: OrderNumberResponse;
  dataCartFooter: CartResponseInterface['carts'];
  loadingOrderNumber: boolean;
  loadingAddress: boolean;
  loadingCartFooter: boolean;
  errorRecipient?: string;
  isClaimToken: boolean;
  isClaimFree: boolean;
  innerRef: React.RefObject<HTMLDivElement>;
}

function SectionGroup(props: Props) {
  const {
    dataAddress,
    dataOrderNumber,
    loadingOrderNumber,
    loadingAddress,
    dataCartFooter,
    loadingCartFooter,
    errorRecipient,
    innerRef,
    isClaimToken,
    isClaimFree,
  } = props;

  const history = useHistory();
  const {
    location: { search },
  } = history;

  const lsGetAddrID = lsGet({ key: 'addr' });
  const qs = queryString.parse(search);

  const summaryAddress = useMemo(() => {
    if (!loadingAddress) {
      const getData = dataAddress.find(item =>
        lsGetAddrID ? item.id === Number(lsGetAddrID) : item.isDefault === true,
      );
      const isHaveAddress = Boolean(getData?.id) || false;

      return {
        isHaveAddress,
        road: getData?.addrLine1 || '',
        recipientName: getData?.namaPenerima || '',
      };
    }

    return {
      isHaveAddress: false,
      road: '',
      recipientName: '',
    };
  }, [dataAddress, loadingAddress, lsGetAddrID]);

  const handleClickAddAddress = () => {
    const isNotDefaultAddr = dataAddress.length > 0;

    history.push({
      pathname: isNotDefaultAddr ? '/address/list' : '/address/choose-location',
      search: queryString.stringify({ ld: '/checkout', ...qs }),
    });
  };

  const handleClickExistAddress = () => {
    history.push({
      pathname: '/address/list',
      search: queryString.stringify({ ld: '/checkout', ...qs }),
    });
  };

  const handleClickRecipient = () => {
    history.push({
      pathname: '/checkout/recipient',
      search: queryString.stringify({
        ld: '/checkout',
        ...qs,
      }),
    });
  };

  return (
    <>
      <div className={stySectionGroup}>
        <div>
          <Typography fontSize="16px" color="primary" fontWeight="bold">
            Alamat pengiriman
          </Typography>
          <Flex
            alignItems="center"
            padding="16px 0"
            onClick={
              summaryAddress.isHaveAddress
                ? () => handleClickExistAddress()
                : () => handleClickAddAddress()
            }
          >
            <RoomIcon />
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              margin="0 0 0 12px"
            >
              {summaryAddress.isHaveAddress ? (
                <Typography fontSize="16px" color="primary">
                  {summaryAddress.road}
                </Typography>
              ) : (
                <Typography fontSize="16px" color="primary">
                  Isi Alamat kamu yuk!
                </Typography>
              )}
              <ChevronRightIcon />
            </Flex>
          </Flex>
        </div>
        <div className={styDivider} />
        <div ref={innerRef}>
          <Typography fontSize="16px" color="primary" fontWeight="bold">
            Data Penerima
          </Typography>
          <Flex alignItems="center" padding="16px 0" onClick={handleClickRecipient}>
            <PersonIcon color={errorRecipient ? 'error' : 'primary'} />
            <Flex width="100%" justifyContent="space-between" alignItems="center">
              <Typography
                fontSize="16px"
                color={errorRecipient ? 'error' : 'primary'}
                style={{ marginLeft: '12px' }}
              >
                {errorRecipient
                  ? errorRecipient
                  : summaryAddress.recipientName || 'Isi Data kamu yuk!'}
              </Typography>
              <ChevronRightIcon />
            </Flex>
          </Flex>
        </div>

        <div className={styDivider} />
        <ShippingSection isInContainer />
      </div>

      <div className={stySectionGroup}>
        <Typography fontSize="16px" color="primary" fontWeight="bold">
          Ringkasan belanja
        </Typography>

        <SummarySection
          dataOrderNumber={dataOrderNumber}
          loadingOrderNumber={loadingOrderNumber}
          dataCartFooter={dataCartFooter}
          loadingCartFooter={loadingCartFooter}
          isClaimToken={isClaimToken}
          isClaimFree={isClaimFree}
        />
      </div>
    </>
  );
}

export default SectionGroup;
