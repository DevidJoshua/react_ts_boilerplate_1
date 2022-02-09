import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';

import Timer from '@components/Timer';
import Typography from '@mui/material/Typography';

import { WaitingResponse } from '@routes/Waiting/interface';
import { styContainer, styWaitinInfo } from './styles';

dayjs.extend(dayjsPluginUTC);
interface Props {
  dataWaiting?: WaitingResponse;
}

function CountDown(props: Props) {
  const { dataWaiting } = props;

  const timeExpired = useMemo(() => {
    const formatted = dayjs(dataWaiting?.expiredTime).utc().format('DD MMM YYYY HH:mm:ss');
    const parseDate = dayjs(formatted).valueOf();
    return parseDate;
  }, [dataWaiting?.expiredTime]);

  return (
    <div className={styContainer}>
      <Typography className="title" fontSize="16px" fontWeight="bold" color="secondary">
        Menunggu Teman Masuk
      </Typography>

      <Timer date={timeExpired} variant="large" />

      <div className={styWaitinInfo}>
        <Typography fontSize="14px" color="secondary">
          Jika tidak ada yang bergabung dalam 24 jam, belanjaan kamu akan terhapus dan uang akan
          dikembalikan melalui wallet kamu.
        </Typography>
      </div>
    </div>
  );
}

export default CountDown;
