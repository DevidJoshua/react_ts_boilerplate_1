import React from 'react';
import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';
import { styCoverImg } from '../styles';

interface Props {
  productName: string;
  productImage: string;
}

function ProductItem(props: Props) {
  const { productImage, productName } = props;

  return (
    <Flex
      style={{
        width: 'calc(100% / 2)',
      }}
    >
      <Flex
        width="100%"
        flexDirection="column"
        padding="0"
        margin="0 8px 16px"
        style={{
          backgroundColor: '#F5FAFF',
          borderRadius: '8px',
        }}
      >
        <div className={styCoverImg}>
          <img src={productImage} />
        </div>

        <Flex
          margin="12px 0 12px"
          padding="0 16px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{productName}</Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProductItem;
