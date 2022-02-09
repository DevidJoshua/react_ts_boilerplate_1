import React, { useState, useEffect } from 'react';
import Flex from '@components/Flex';
import QuantityEditor from '@components/QuantityEditor';

import useDebounce from '@/hooks/useDebounce';
import useDeleteCart from '@routes/Cart/hooks/useDeleteCart';
import { useToaster } from '@/context/Toaster';

import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { styItemCart } from './styles';
import toIDR from '@/helpers/toIDR';

interface Props {
  token: string;
  cartID: number;
  productName: string;
  productQty: number;
  productPrice: number;
  productID: number;
  productImage: string;
  checkedProduct?: number[];
  onATC: (qty: number) => void;
  onRefetchCart: () => void;
  onRefetchCartList: () => void;
  onSetCheckedProduct: (params: number | number[]) => void;
}

function ItemCart(props: Props) {
  const {
    token,
    cartID,
    productQty,
    productPrice,
    productName,
    checkedProduct,
    productID,
    onSetCheckedProduct,
    productImage,
    onATC,
    onRefetchCart,
    onRefetchCartList,
  } = props;

  const { showToaster } = useToaster();
  const { onDeleteCart } = useDeleteCart();

  const [qty, setQty] = useState<number>(productQty || 1);
  const [qtyTemp, setQtyTemp] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const getChecked = checkedProduct?.some(val => val === productID) || false;
    setIsChecked(getChecked);
  }, [checkedProduct, productID]);

  const handleCheckedProduct = () => {
    onSetCheckedProduct(productID);
  };

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

  const handleClickDeleteCart = () => {
    onDeleteCart({ token, cartID }, result => {
      if (result.id === cartID) {
        showToaster({
          text: 'Barang berhasil dihapus',
          isError: false,
          duration: 2500,
        });

        onRefetchCartList();
        onRefetchCart();
      }
    });
  };

  const updateQty = useDebounce(qty, 500, () => {
    onATC(qtyTemp);
  });

  useDebounce(updateQty, 500, () => {
    onRefetchCart();
    setQtyTemp(0);
  });

  return (
    <Flex alignItems="center" padding="24px 16px 24px 6px" className={styItemCart}>
      <Flex alignItems="center">
        <Checkbox checked={isChecked} onChange={handleCheckedProduct} />
        <img src={productImage} style={{ maxWidth: '105px', maxHeight: '115px' }} />
      </Flex>
      <Flex flexDirection="column" margin="0 0 0 16px" width="100%">
        <Typography fontSize="16px" style={{ marginBottom: '8px' }}>
          {productName}
        </Typography>
        <Typography fontSize="16px" fontWeight="bold">
          {toIDR(productPrice || 0)}
        </Typography>

        <Flex margin="8px 0 0" alignItems="center">
          <Flex margin="0 12px 0 0">
            <QuantityEditor
              value={qty}
              maxLength={3}
              disabledMin={qty === 1}
              onChangeText={handleChangeTextQty}
              onClickPlus={handleClickPlusQty}
              onClickMinus={handleClickMinusQty}
            />
          </Flex>

          <Flex>
            <div onClick={handleClickDeleteCart}>
              <DeleteIcon />
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ItemCart;
