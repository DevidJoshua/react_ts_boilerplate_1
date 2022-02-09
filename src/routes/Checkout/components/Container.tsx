import React, { useContext, useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import lsGet from '@/helpers/client-storage/localStorageGet';

import { useUserData } from '@/context/userData';
import { useToaster } from '@/context/Toaster';
import { CheckoutContext } from '@routes/Checkout/context/Checkout';

import TopNav from '@components/TopNav';

import ProductSection from './Product';
import SectionGroup from './SectionGroup';
import Footer from './Footer';

function Container() {
  const history = useHistory();
  const recipientRef = useRef<HTMLDivElement>(null);
  const [errorRecipient, setErrorRecipient] = useState<string>('');

  const {
    location: { search },
  } = history;
  const isFromCart = queryString.parse(search)?.from || '';
  const isFromGroup = queryString.parse(search)?.group || '';

  const {
    userInfo: {
      token,
      profileID,
      moreUserInfo: { rewardPoint },
    },
  } = useUserData();
  const { showToaster } = useToaster();

  const {
    dataAddress,
    dataCart,
    dataCartFooter,
    dataOrderNumber,
    loadingAddress,
    loadingCart,
    loadingCartFooter,
    loadingOrderNumber,
    loadingCheckout,
    redirectUrl,
    isClaimToken,
    isClaimFree,
    refetchCart,
    onClickCheckout,
  } = useContext(CheckoutContext);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  const lsGetAddrID = lsGet({ key: 'addr' });

  const summaryAddress = useMemo(() => {
    if (!loadingAddress) {
      const getData = dataAddress.find(item =>
        lsGetAddrID ? item.id === lsGetAddrID : item.isDefault === true,
      );

      return {
        recipientName: getData?.namaPenerima || '',
        recipientPhone: getData?.phoneNumberPenerima || '',
      };
    }

    return {
      recipientName: '',
      recipientPhone: '',
    };
  }, [dataAddress, loadingAddress, lsGetAddrID]);

  const handleBack = () => {
    if (isFromCart) {
      history.push(String(isFromCart));
    } else {
      history.push('/');
    }
  };

  const handleClickCheckout = useCallback(
    (type: string, isContinueFromGroup: boolean) => {
      if (!summaryAddress.recipientName || !summaryAddress.recipientPhone) {
        window.scrollTo({
          top: recipientRef.current?.offsetTop,
          behavior: 'smooth',
        });

        setErrorRecipient('Isi data pengirim yuk!');
        showToaster({
          text: 'Isi data pengirim yuk!',
          isError: true,
          duration: 2500,
        });
      } else {
        onClickCheckout(type, isContinueFromGroup);
      }
    },
    [onClickCheckout, showToaster, summaryAddress.recipientName, summaryAddress.recipientPhone],
  );

  return (
    <>
      <div style={{ paddingBottom: '120px' }}>
        <TopNav title="Order Detail" onBack={handleBack} />

        <ProductSection
          token={token}
          profileID={profileID}
          dataCart={dataCart}
          loadingCart={loadingCart}
          onRefetchCart={refetchCart}
          isClaimToken={isClaimToken}
          isClaimFree={isClaimFree}
          isFromGroup={Boolean(isFromGroup)}
        />

        <SectionGroup
          dataOrderNumber={dataOrderNumber}
          loadingOrderNumber={loadingOrderNumber}
          dataAddress={dataAddress}
          loadingAddress={loadingAddress}
          dataCartFooter={dataCartFooter}
          loadingCartFooter={loadingCartFooter}
          errorRecipient={errorRecipient}
          innerRef={recipientRef}
          isClaimToken={isClaimToken}
          isClaimFree={isClaimFree}
        />

        <Footer
          getCartFooter={refetchCart}
          dataCartFooter={dataCartFooter}
          loadingCartFooter={loadingCartFooter}
          onClickCheckout={handleClickCheckout}
          isFromGroup={Boolean(isFromGroup)}
          isClaimToken={isClaimToken}
          isClaimFree={isClaimFree}
          myToken={rewardPoint}
          loading={loadingCheckout}
        />
      </div>
    </>
  );
}

export default Container;
