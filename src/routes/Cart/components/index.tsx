import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import lsSet from '@/helpers/client-storage/localStorageSet';

import TopNav from '@components/TopNav';
import Flex from '@components/Flex';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import useATC from '@/hooks/useATC';
import { useUserData } from '@/context/userData';
import useGetCart from '@routes/Cart/hooks/useGetCart';

import ItemCart from './ItemCart';
import EmptyCart from './EmptyCart';
import LoaderCart from './LoaderCart';
import { styWrapCart, styBtnFloating } from './styles';
import toIDR from '@/helpers/toIDR';

function Container() {
  const history = useHistory();
  const [checkedProduct, setCheckedProduct] = useState<Array<number>>([]);

  const {
    userInfo: { token, profileID },
  } = useUserData();
  const { dataCart, loading, getCart } = useGetCart();
  const { dataCart: dataCart2, loading: loading2, getCart: getCart2 } = useGetCart();
  const { onATC } = useATC();

  const handleRefetchCart = useCallback(() => {
    getCart2({ token, profileID });
  }, [getCart2, profileID, token]);

  const handleRefetchCartList = useCallback(() => {
    getCart({ token, profileID });
  }, [getCart, profileID, token]);

  useEffect(() => {
    getCart({ token, profileID });
  }, [getCart, profileID, token]);

  const handleSetCheckedProduct = (val: number | number[]) => {
    if (Array.isArray(val)) {
      setCheckedProduct(val);
      return;
    }

    setCheckedProduct(prev => {
      const temp = [...prev];
      const index = temp.indexOf(val);
      if (index > -1) {
        temp.splice(index, 1);
        return temp;
      }
      return [...temp, val];
    });
  };

  const productCheckedLength = checkedProduct.length;

  const isAllChecked = useMemo(
    () => dataCart.length === checkedProduct.length,
    [checkedProduct.length, dataCart.length],
  );

  const isPartialChecked = useMemo(
    () => checkedProduct.length < dataCart.length && checkedProduct.length > 0,
    [checkedProduct.length, dataCart.length],
  );

  const handleCheckedAll = useCallback(() => {
    const getMapProductID = dataCart.map(item => item.sale_event_detail.id);
    handleSetCheckedProduct(isAllChecked ? [] : getMapProductID);
  }, [dataCart, isAllChecked]);

  const getTotalSelectedItem = useMemo(() => {
    let totalPrice = 0;
    const dc = dataCart2.length === 0 ? dataCart : dataCart2;

    if (checkedProduct.length) {
      const selectedProduct = dc.filter(val => checkedProduct.includes(val.sale_event_detail.id));

      selectedProduct.forEach(val => {
        const price = val.qty * val.sale_event_detail.groupPrice;
        totalPrice += price;
      });
    }

    return totalPrice;
  }, [checkedProduct, dataCart, dataCart2]);

  const handleClickBuy = useCallback(() => {
    lsSet({ key: 'dfc', value: checkedProduct });

    history.push({
      pathname: 'checkout',
      search: queryString.stringify({
        from: '/cart',
      }),
    });
  }, [checkedProduct, history]);

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

  const renderContent = useMemo(() => {
    if (dataCart.length) {
      return (
        <>
          <Flex
            padding="0 16px"
            alignItems="center"
            style={{
              borderBottom: 'thin solid #ededed',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllChecked}
                  onChange={handleCheckedAll}
                  indeterminate={isPartialChecked}
                />
              }
              label="Pilih Semua"
            />
          </Flex>

          <div className={styWrapCart}>
            {dataCart.map((item, id) => {
              return (
                <ItemCart
                  key={id}
                  cartID={item.id}
                  token={token}
                  checkedProduct={checkedProduct}
                  productID={item.sale_event_detail.id}
                  productName={item.product_varian.name}
                  productQty={item.qty}
                  productPrice={item.sale_event_detail.groupPrice}
                  productImage={item.product_varian.varianPic.url}
                  onSetCheckedProduct={handleSetCheckedProduct}
                  onRefetchCartList={handleRefetchCartList}
                  onRefetchCart={handleRefetchCart}
                  onATC={(qty: number) =>
                    handleATC(item.sale_event_detail.id, item.sale_event_detail.groupPrice, qty)
                  }
                />
              );
            })}
          </div>

          <div className={styBtnFloating}>
            <Flex flexDirection="column" margin="0 16px 16px">
              <Flex flexDirection="column" margin="0 0 8px">
                {loading2 ? (
                  <>
                    <Skeleton variant="text" width={50} />
                    <Skeleton variant="text" width={100} />
                  </>
                ) : (
                  <>
                    <Typography>Total</Typography>
                    <Typography fontWeight="bold" fontSize="16px">
                      {getTotalSelectedItem ? toIDR(getTotalSelectedItem) : '-'}
                    </Typography>
                  </>
                )}
              </Flex>

              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                onClick={handleClickBuy}
                disabled={productCheckedLength === 0}
              >
                Beli {productCheckedLength ? `(${productCheckedLength})` : ''}
              </Button>
            </Flex>
          </div>
        </>
      );
    }

    return <EmptyCart />;
  }, [
    checkedProduct,
    dataCart,
    getTotalSelectedItem,
    handleATC,
    handleCheckedAll,
    handleClickBuy,
    handleRefetchCart,
    handleRefetchCartList,
    isAllChecked,
    isPartialChecked,
    loading2,
    productCheckedLength,
    token,
  ]);

  return (
    <>
      <TopNav title="Keranjang" onBack={() => history.push('/')} />
      {loading ? <LoaderCart /> : renderContent}
    </>
  );
}

export default Container;
