import React from 'react';
import Typography from '@mui/material/Typography';
import { styItemProduct, styContent, styWrapPrice } from './styles';
import toIDR from '@/helpers/toIDR';

interface Props {
  productName?: string;
  productImage?: string;
  productDesc?: string;
  productPrice?: number;
  productQty?: number;
}

function ItemProduct({ productName, productDesc, productPrice, productImage }: Props) {
  return (
    <div className={styItemProduct}>
      <img src={productImage} />
      <div className={styContent}>
        <Typography fontWeight="bold" fontSize="14px">
          {productName}
        </Typography>
        <Typography fontSize="14px">{productDesc}</Typography>

        <div className={styWrapPrice}>
          <Typography fontWeight="bold" fontSize="14px">
            {toIDR(productPrice || 0)}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
