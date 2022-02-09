import React from 'react';

import Button from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';

import Flex from '@components/Flex';
import { styContainer, styContent, styContentProduct, styContentPrice } from './styles';

interface Props {
  productName?: string;
  productImage?: string | null;
  productPoint?: string | number;
  productPrice?: number | string;
  sold?: number;
  rating?: number;
  loading?: boolean;
  onClick?: React.MouseEventHandler;
  onClickWishlist?: React.MouseEventHandler;
  onClickCart?: React.MouseEventHandler;
}

function ProductCard({
  productImage,
  productName,
  productPoint,
  productPrice,
  sold,
  rating,
  loading,
  onClick,
  onClickCart,
}: Props) {
  return (
    <div className={styContainer}>
      <div className={styContent} onClick={onClick}>
        <div className="cover-img">
          <img src={productImage || ''} />
        </div>

        {/* <div className={styBtnWishlist} onClick={onClickWishlist}>
          <FavoriteBorderIcon color="primary" />
        </div> */}

        <Flex flexDirection="column" width="100%" padding="0 10px">
          <div className={styContentProduct}>
            <Typography color="primary" fontSize="14px">
              {productName}
            </Typography>

            {Boolean(productPoint) && (
              <Typography fontSize="10px" className="label-point" textAlign="right">
                +{productPoint} token
              </Typography>
            )}
          </div>

          <div className={styContentPrice}>
            <div>
              <Typography color="primary" fontSize="14px" fontWeight="bold">
                {productPrice}
              </Typography>

              <div style={{ display: 'flex' }}>
                {Boolean(rating) && (
                  <div className="content-flex">
                    <StarIcon color="primary" style={{ width: '10px', height: '10px' }} />
                    <Typography fontSize="8px" style={{ color: '#4F4F4F' }}>
                      {rating}
                    </Typography>
                  </div>
                )}
                {Boolean(sold) && (
                  <div className="content-flex">
                    <Typography fontSize="8px" style={{ color: '#4F4F4F' }}>
                      Terjual {sold}
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="contained"
              color="primary"
              style={{
                width: '28px',
                height: '28px',
                minWidth: '28px',
              }}
              onClick={onClickCart}
              loading={loading}
              disabled={loading}
            >
              <AddShoppingCartIcon color="secondary" style={{ margin: 0 }} />
            </Button>
          </div>
        </Flex>
      </div>
    </div>
  );
}

export default ProductCard;
