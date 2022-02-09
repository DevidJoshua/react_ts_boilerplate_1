import React, { useCallback } from 'react';

import useATC from '@/hooks/useATC';
import Typography from '@mui/material/Typography';
import ItemProduct from './ItemProduct';

import { CartResponseInterface } from '@routes/Checkout/interface';
import { styWrapProduct } from './styles';

interface Props {
  dataCart: CartResponseInterface['carts'];
  loadingCart: boolean;
  token: string;
  profileID: number;
  isFromGroup?: boolean;
  isClaimToken?: boolean;
  isClaimFree?: boolean;
  onRefetchCart: () => void;
}

function Product(props: Props) {
  const { dataCart, token, profileID, onRefetchCart, isFromGroup, isClaimToken, isClaimFree } =
    props;

  const { onATC } = useATC();

  const handleATC = useCallback(
    (saleEventID: number, price: number, qty: number) => {
      const productToCart = [
        {
          sale_event_detail: saleEventID,
          user_profile: profileID,
          savedPrice: price,
          qty,
        },
      ];
      onATC({ token, dataProduct: productToCart, isShowToaster: false });
    },
    [onATC, profileID, token],
  );

  const renderProduct = () => {
    if (dataCart.length > 0) {
      return dataCart.map((item, id) => {
        return (
          <ItemProduct
            key={id}
            productName={item.product_varian.produk.prodName}
            productDesc={item.product_varian.produk.tagLine}
            productPrice={item.sale_event_detail.groupPrice}
            productVariant={item.product_varian.name}
            productImage={item.product_varian.varianPic.url}
            productQty={item.qty}
            productToken={item.sale_event_detail.pointPrice}
            onRefetchCart={() => onRefetchCart()}
            isFromGroup={isFromGroup}
            isClaimToken={isClaimToken}
            isClaimFree={isClaimFree}
            onATC={(qty: number) =>
              handleATC(item.sale_event_detail.id, item.sale_event_detail.groupPrice, qty)
            }
          />
        );
      });
    }

    return null;
  };

  return (
    <div className={styWrapProduct}>
      <Typography fontWeight="bold" fontSize="16px" color="primary" marginBottom="12px">
        Produk
      </Typography>
      {renderProduct()}
    </div>
  );
}

export default Product;
