import React from 'react';
import Typography from '@mui/material/Typography';

import ItemProduct from './ItemProduct';

import { ItemsResponse } from '@routes/WaitingFriend/interface';
import { styWrapProduct } from './styles';

interface Props {
  buyerName?: string[];
  products: ItemsResponse[] | undefined;
}

function Product(props: Props) {
  const { products, buyerName } = props;

  const renderProductItem = () => {
    return products?.map((val, id) => {
      return (
        <ItemProduct
          key={id}
          productParentName={val.product_varian.name}
          productName={val.product_varian.produk.prodName}
          productDesc={val.product_varian.produk.descr1}
          productPrice={val.groupPrice}
          productImage={val.product_varian.varianPic.url}
          productQty={val.qty}
        />
      );
    });
  };

  return (
    <div className={styWrapProduct}>
      <Typography
        fontWeight="bold"
        fontSize="16px"
        color="primary"
        style={{ marginBottom: '18px' }}
      >
        Produk yang {buyerName?.join('&')} Beli
      </Typography>

      {renderProductItem()}
    </div>
  );
}

export default Product;
