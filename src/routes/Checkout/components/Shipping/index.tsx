import React from 'react';
import { cx } from 'emotion';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Typography from '@mui/material/Typography';

import { styContainer, styContent } from './styles';

interface Props {
  isInContainer?: boolean;
}

function Shipping({ isInContainer }: Props) {
  return (
    <>
      <div className={cx({ [styContainer]: !isInContainer })}>
        <Typography fontSize="16px" color="primary" fontWeight="bold">
          Pengiriman
        </Typography>
        <div className={styContent}>
          <div className="shipping-info">
            <LocalShippingIcon />

            <Typography fontSize="16px" color="primary" style={{ marginLeft: '12px' }}>
              Gratis Ongkir 100%
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shipping;
