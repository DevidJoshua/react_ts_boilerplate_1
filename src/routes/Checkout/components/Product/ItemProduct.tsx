import React, { useState } from 'react';
import toIDR from '@/helpers/toIDR';

import useDebounce from '@/hooks/useDebounce';

import Flex from '@components/Flex';
import Chip from '@mui/material/Chip';
import QuantityEditor from '@components/QuantityEditor';
import Typography from '@mui/material/Typography';

import { styItemProduct, styContent, styWrapChip, styWrapPrice } from './styles';

interface Props {
  productName?: string;
  productDesc?: string;
  productPrice?: number;
  productQty?: number;
  productVariant?: string;
  productImage?: string;
  productToken?: number;
  isFromGroup?: boolean;
  isClaimToken?: boolean;
  isClaimFree?: boolean;
  onATC: (qty: number) => void;
  onRefetchCart: () => void;
}

function ItemProduct(props: Props) {
  const {
    productName,
    productDesc,
    productPrice,
    productQty,
    productVariant,
    productImage,
    isFromGroup,
    isClaimToken,
    isClaimFree,
    productToken = 0,
    onATC,
    onRefetchCart,
  } = props;

  const [qty, setQty] = useState<number>(productQty || 1);
  const [qtyTemp, setQtyTemp] = useState<number>(0);

  const handleChangeTextQty = (text: number) => {
    setQty(text === 0 ? 1 : text);
    setQtyTemp(text === 0 ? 1 : text);
  };

  const handleClickPlusQty = () => {
    setQty(prev => prev + 1);
    setQtyTemp(prev => prev + 1);
  };

  const handleClickMinusQty = () => {
    setQty(prev => prev - 1);
    setQtyTemp(prev => prev - 1);
  };

  const updateQty = useDebounce(qty, 500, () => {
    onATC(qtyTemp);
  });

  useDebounce(updateQty, 500, () => {
    onRefetchCart();
    setQtyTemp(0);
  });

  return (
    <div className={styItemProduct}>
      <img src={productImage} />
      <div className={styContent}>
        <Typography fontWeight="bold" fontSize="14px">
          {productName}
        </Typography>
        {Boolean(productDesc) && <Typography fontSize="14px">{productDesc}</Typography>}

        <div className={styWrapChip}>
          <div className="item-chip">
            <Chip label={productVariant} color="primary" />
          </div>
        </div>

        {isClaimToken && (
          <Flex margin="12px 0 0">
            <Typography>
              Token: <strong>{toIDR(productToken, false)}</strong>
            </Typography>
          </Flex>
        )}

        <div className={styWrapPrice}>
          <Typography fontWeight="bold" fontSize="14px" style={{ marginRight: '18px' }}>
            {isClaimFree ? 'Gratis' : toIDR(productPrice || 0)}
          </Typography>

          <QuantityEditor
            value={qty}
            maxLength={3}
            disabledMin={qty === 1 || isFromGroup || isClaimToken || isClaimFree}
            disabledPlus={isFromGroup || isClaimToken || isClaimFree}
            disabledText={isFromGroup || isClaimToken || isClaimFree}
            onChangeText={handleChangeTextQty}
            onClickPlus={handleClickPlusQty}
            onClickMinus={handleClickMinusQty}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
