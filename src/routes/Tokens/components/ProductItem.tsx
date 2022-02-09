import React from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import Flex from '@components/Flex';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImgCoinStack from '@/assets/coin-stack.png';
import { styCoverImg } from './styles';

interface Props {
  saleEventID: number;
  productToken: number | null;
  productName: string;
  productImage: string;
  myToken: number;
}

function ProductItem(props: Props) {
  const { saleEventID, productImage, productName, productToken, myToken } = props;
  const history = useHistory();

  const isAvailClaim = myToken >= (productToken || 0);

  const handleClickClaim = () => {
    history.push({
      pathname: '/checkout',
      search: queryString.stringify({
        claim: 'token',
        pid: saleEventID,
      }),
    });
  };

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

          <Flex alignItems="center">
            <img src={ImgCoinStack} />
            <Typography fontSize="14px" style={{ color: '#6556D9', marginLeft: '8px' }}>
              {productToken}
            </Typography>
          </Flex>
        </Flex>

        <Flex padding="0 16px 16px">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="medium"
            disabled={!isAvailClaim}
            onClick={isAvailClaim ? () => handleClickClaim() : () => {}}
          >
            Tukar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProductItem;
