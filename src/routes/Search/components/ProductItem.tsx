import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import toIDR from '@/helpers/toIDR';

import ProductCard from '@components/ProductCard';

import useATC from '@/hooks/useATC';
import { useFloatingATC } from '@/context/FloatingATC';
import { useUserData } from '@/context/userData';

interface Props {
  saleEventID: number;
  productName?: string;
  productImage?: string | null;
  productPoint?: string | number;
  productPrice: number;
  sold?: number;
  rating?: number;
}

function ProductItem(props: Props) {
  const { saleEventID, productImage, productName, productPoint, productPrice, sold, rating } =
    props;
  const history = useHistory();

  const {
    isLoggedIn,
    userInfo: { token, profileID },
  } = useUserData();
  const { onATC, loading } = useATC();
  const { refetch: refetchFloatingATC } = useFloatingATC();

  const handleClickATC = useCallback(
    (saleEventID: number, price: number) => {
      if (!isLoggedIn) {
        history.push('/login');
      } else {
        const productToCart = [
          {
            sale_event_detail: saleEventID,
            user_profile: profileID,
            savedPrice: price,
            qty: 1,
          },
        ];
        onATC({ token, isShowToaster: true, dataProduct: productToCart });
        setTimeout(() => {
          refetchFloatingATC();
        }, 800);
      }
    },
    [history, isLoggedIn, onATC, profileID, refetchFloatingATC, token],
  );

  return (
    <ProductCard
      productImage={productImage}
      productName={productName}
      productPoint={productPoint}
      productPrice={toIDR(productPrice)}
      sold={sold}
      rating={rating}
      loading={loading}
      onClickCart={() => handleClickATC(saleEventID, productPrice)}
    />
  );
}

export default ProductItem;
