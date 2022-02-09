import React, { memo, useCallback } from 'react';
import { cx } from 'emotion';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import useUpdateNotification from '@routes/Notification/hooks/useUpdateNotification';
import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';

import { styItemNotif } from './styles';

dayjs.extend(utc);

interface Props {
  isRead?: boolean;
  publishDate?: string;
  message?: string;
  token: string;
  notifID: number;
}

function ItemNotification(props: Props) {
  const { isRead, publishDate, message, token, notifID } = props;
  const { onUpdateNotification } = useUpdateNotification();

  const handleClickRead = useCallback(() => {
    onUpdateNotification(token, notifID);
  }, [notifID, onUpdateNotification, token]);

  return (
    <Flex
      width="100%"
      flexDirection="column"
      className={cx(styItemNotif, { unread: !isRead })}
      onClick={handleClickRead}
    >
      <Flex justifyContent="flex-startt" alignItems="center" margin="0 0 12px">
        <Typography fontSize="14px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          {dayjs(publishDate).utc().format('DD MMM YYYY HH:mm')}
        </Typography>
      </Flex>

      <Typography fontSize="16px">{message}</Typography>
    </Flex>
  );
}

export default memo(ItemNotification);
