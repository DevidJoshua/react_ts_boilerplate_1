import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styContainer } from './styles';

function Promo() {
  return (
    <div className={styContainer}>
      <div className="info">
        <Typography fontWeight="bold" fontSize="16px">
          Potongan Harga!!!
        </Typography>

        <Typography fontSize="14px">
          Bagikan keranjang kamu dan kamu dapat potongan harga.
        </Typography>
      </div>
      <div className="price">
        <Typography fontWeight="bold" fontSize="16px">
          Rp80.900
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{
            fontWeight: 'bold',
            marginTop: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          Beli Bareng
        </Button>
      </div>
    </div>
  );
}

export default Promo;
