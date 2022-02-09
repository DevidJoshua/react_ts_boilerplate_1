import React, { useEffect } from 'react';
import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';

import useGetProductToken from '@routes/Tokens/hooks/useGetProductToken';

import LoaderLoadable from '@/components/LoaderLoadable';
import ProductItem from './ProductItem';

interface Props {
  myToken: number;
}

function ProductList(props: Props) {
  const { myToken } = props;
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
        Tukar Token Kamu
      </Typography>

      <Flex margin="24px 0 0" width="100%" style={{ flexWrap: 'wrap' }}>
        {dataProductToken.map(val => (
          <ProductItem
            key={val.id}
            saleEventID={val.id}
            myToken={myToken}
            productToken={val.pointPrice}
            productName={val.product_varian.name}
            productImage={val.product_varian.varianPic.url}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default ProductList;
