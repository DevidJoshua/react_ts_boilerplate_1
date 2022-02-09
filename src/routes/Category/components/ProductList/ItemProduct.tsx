import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import useATC from '@hooks/useATC';
import { useUserData } from '@/context/userData';
import { useFloatingATC } from '@/context/FloatingATC';

import Flex from '@components/Flex';
import toIDR from '@helpers/toIDR';

import Button from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { styItemProduct } from './styles';

interface Props {
  saleEventID: number;
  productName?: string;
  productPrice?: number;
  productImage?: string;
}

function ItemProduct(props: Props) {
  const { saleEventID, productName, productPrice = 0, productImage } = props;

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
    <div className={styItemProduct}>
      <img src={productImage} alt={productName} />

      <Flex justifyContent="space-between" alignItems="center">
        <div>
          <Typography fontSize="14px" margin="0 0 4px">
            {productName}
          </Typography>
          <Typography fontSize="14px" fontWeight="bold">
            {toIDR(productPrice || 0)}
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{
            padding: '4px 22px',
            height: '100%',
          }}
          startIcon={
            <AddShoppingCartIcon color="secondary" style={{ marginRight: 0, width: 15 }} />
          }
          loading={loading}
          disabled={loading}
          onClick={() => handleClickATC(saleEventID, productPrice)}
        >
          <Typography fontSize="14px" fontWeight="bold" color="secondary">
            Beli
          </Typography>
        </Button>
      </Flex>
    </div>
  );
}

export default ItemProduct;
