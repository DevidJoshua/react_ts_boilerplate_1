import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';

import Flex from '@components/Flex';
import LoaderLoadable from '@/components/LoaderLoadable';
import useGetProductToken from '@routes/Tokens/hooks/useGetProductToken';

import ProductFreeItem from './ProductFreeItem';

function ProductFree() {
  const { getProductToken, dataProductToken, loading } = useGetProductToken();

  useEffect(() => {
    getProductToken();
  }, [getProductToken]);

  if (loading) {
    return <LoaderLoadable />;
  }

  return (
    <Flex margin="24px 16px 0" flexDirection="column">
      <Typography fontSize="18px" fontWeight="bold">
        Produk yang akan kamu dapatkan
      </Typography>

      <Flex margin="24px 0 0" width="100%" style={{ flexWrap: 'wrap' }}>
        {dataProductToken.map(val => (
          <ProductFreeItem
            key={val.id}
            productName={val.product_varian.name}
            productImage={val.product_varian.varianPic.url}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default ProductFree;
