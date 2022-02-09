import React from 'react';

import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';
import { ProductFreeResponse } from '@routes/Sharereact/interface/productFree';

interface Props {
  dataProduct?: ProductFreeResponse[];
}

function ProductFree(props: Props) {
  const { dataProduct } = props;

  return (
    <Flex flexDirection="column" margin="8px 0">
      <Typography fontSize="14px" fontWeight="bold" margin="0 0 8px">
        Produk yang bisa kamu dapatkan
      </Typography>

      <Flex alignItems="center" style={{ overflowX: 'scroll' }}>
        {dataProduct?.map(val => {
          return (
            <Flex key={val.id}>
              <img
                src={val.product_varian.varianPic.url}
                style={{ width: 'auto', height: '70px', margin: '0 2px 0 0', borderRadius: '4px' }}
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ProductFree;
