import React, { useMemo } from 'react';
import { cx } from 'emotion';
import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';
import { styWrapStep, styItemStep } from './styles';

interface Props {
  status: string;
}

function OrderStatus(props: Props) {
  const { status } = props;

  const getStatus = useMemo(() => {
    switch (status) {
      case 'Dikemas':
        return {
          step1: true,
          step2: false,
          step3: false,
          step4: false,
        };
      case 'Pengiriman':
        return {
          step1: true,
          step2: true,
          step3: false,
          step4: false,
        };
      case 'Dengan Kurir':
        return {
          step1: true,
          step2: true,
          step3: true,
          step4: false,
        };
      default:
        return {
          step1: true,
          step2: true,
          step3: true,
          step4: true,
        };
    }
  }, [status]);

  return (
    <Flex flexDirection="column" width="100%">
      <Typography fontWeight="bold" fontSize="16px">
        Status Pengiriman
      </Typography>

      <div className={styWrapStep}>
        <div className={styItemStep}>
          <div className={cx('img', { active: getStatus.step1 })}></div>
          <Typography fontSize="12px" align="center">
            Dikemas
          </Typography>
        </div>
        <div className={styItemStep}>
          <div className={cx('img', { active: getStatus.step2 })}></div>
          <Typography fontSize="12px" align="center">
            Pengiriman
          </Typography>
        </div>
        <div className={styItemStep}>
          <div className={cx('img', { active: getStatus.step3 })}></div>
          <Typography fontSize="12px" align="center">
            Dengan Kurir
          </Typography>
        </div>
        <div className={styItemStep}>
          <div className={cx('img', { active: getStatus.step4 })}></div>
          <Typography fontSize="12px" align="center">
            Diterima
          </Typography>
        </div>
      </div>
    </Flex>
  );
}

export default OrderStatus;
