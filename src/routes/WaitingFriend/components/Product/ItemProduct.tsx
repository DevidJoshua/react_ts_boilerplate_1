import React from 'react';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { styItemProduct, styContent, styWrapChip, styWrapPrice } from './styles';
import toIDR from '@/helpers/toIDR';

interface Props {
  productParentName?: string;
  productImage?: string;
  productName?: string;
  productDesc?: string;
  productPrice?: number;
  productQty?: number;
}

function ItemProduct(props: Props) {
  const {
    productParentName,
    productName,
    productImage,
    productDesc,
    productPrice = 0,
    productQty = 0,
  } = props;

  const price = productPrice * productQty;

  return (
    <div className={styItemProduct}>
      <img src={productImage} alt={productName} />

      <div className={styContent}>
        <Typography fontWeight="bold" fontSize="14px">
          {productParentName}
        </Typography>
        <Typography fontSize="14px">{productDesc}</Typography>

        <div className={styWrapChip}>
          <div className="item-chip">
            <Chip label={productName} color="primary" />
          </div>
        </div>

        <div className={styWrapPrice}>
          <Typography fontWeight="bold" fontSize="14px">
            {toIDR(price)}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
