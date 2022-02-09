import React from 'react';

import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';
import ImgEmptyState from '@/assets/empty-state-global.png';
import { ProductListResponse } from '@routes/Category/interface';

import ItemProduct from './ItemProduct';
import LoaderProduct from '../LoaderProduct';

interface Props {
  loading?: boolean;
  dataProduct: ProductListResponse[];
}

function ProductList({ loading, dataProduct }: Props) {
  
  if (loading) {
    return <LoaderProduct />;
  }

  const renderProductItem = () => {
    console.log("data=======>",dataProduct)
    if (dataProduct?.length > 0) {
      return dataProduct?.map(val => {
        const product = val.product_varian;
        return (
          <ItemProduct
            key={val.id}
            saleEventID={val.id}
            productImage={product.varianPic.url}
            productName={product.name}
            productPrice={val.groupPrice}
          />
        );
      });
    }

    return (
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <img src={ImgEmptyState} style={{ maxWidth: '160px' }} />
        <Typography>Produk belum tersedia di kategori ini</Typography>
      </Flex>
    );
  };

  return (
    <div>
      <Typography fontSize="18px" fontWeight="bold" color="primary" style={{ margin: '0 0 16px' }}>
        Product
      </Typography>
      {renderProductItem()}
    </div>
  );
}

export default ProductList;
