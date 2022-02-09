import React from 'react';
import Typography from '@mui/material/Typography';
import ProductCard from '@/components/ProductCard';
import ImgProduct from '@/assets/img-product.png';
import { styContainer } from './styles';

function Container() {
  return (
    <div className={styContainer}>
      <Typography fontSize="16px" fontWeight="bold" style={{ marginBottom: '22px' }}>
        Produk yang serupa
      </Typography>

      <div
        style={{
          marginTop: '12px',
          display: 'inline-flex',
          flexWrap: 'wrap',
        }}
      >
        <ProductCard
          productImage={ImgProduct}
          productName="Blush Blush Blush"
          productPoint="123"
          productPrice={98000}
          sold={30}
          rating={4.6}
        />
        <ProductCard
          productImage={ImgProduct}
          productName="Blush Blush Blush"
          productPoint="123"
          productPrice={98000}
          sold={30}
          rating={4.6}
        />
      </div>
    </div>
  );
}

export default Container;
