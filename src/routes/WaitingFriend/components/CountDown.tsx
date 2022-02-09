import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';
import queryString from 'query-string';
import lsSet from '@helpers/client-storage/localStorageSet';

import { useHistory } from 'react-router-dom';
import { useUserData } from '@/context/userData';

import Flex from '@components/Flex';
import Timer from '@components/Timer';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { ItemsResponse } from '@routes/WaitingFriend/interface';
import ImgProfile from '@/assets/dummy-profile.png';
import { styContainer } from './styles';

dayjs.extend(dayjsPluginUTC);

interface Props {
  buyerName?: string[];
  expiredTime?: string;
  products?: ItemsResponse[];
}

function CountDown(props: Props) {
  const { buyerName, expiredTime } = props;
  const history = useHistory();

  const {
    location: { search },
  } = history;
  const getGroupID = queryString.parse(search)?.group || '';

  const { isLoggedIn } = useUserData();

  const timeExpired = useMemo(() => {
    const formatted = dayjs(expiredTime).utc().format('DD MMM YYYY HH:mm:ss');
    const parseDate = dayjs(formatted).valueOf();
    return parseDate;
  }, [expiredTime]);

  const handleClickBuy = () => {
    lsSet({ key: 'gi', value: getGroupID });

    if (!isLoggedIn) {
      history.push({
        pathname: '/login',
        search: queryString.stringify({
          ld: '/checkout',
        }),
      });
    } else {
      history.push({
        pathname: '/checkout',
        search: queryString.stringify({
          group: getGroupID,
          from: '/group',
        }),
      });
    }
  };

  return (
    <div className={styContainer}>
      <Typography className="title" fontSize="16px" fontWeight="bold" color="secondary">
        Menunggu Teman Masuk
      </Typography>

      <Timer date={timeExpired} variant="large" />

      <Flex alignItems="center" justifyContent="center" margin="18px 0 0">
        <Avatar src={ImgProfile} />
        <Typography
          fontSize="16px"
          color="secondary"
          fontWeight="bold"
          style={{ marginLeft: '8px' }}
        >
          {buyerName?.join('&')} ngundang kamu nih!
        </Typography>
      </Flex>

      <Flex
        style={{
          position: 'absolute',
          bottom: '-20px',
          width: 'calc(100% - 32px)',
          margin: '0 auto',
          left: 0,
          right: 0,
        }}
      >
        <Button variant="contained" color="primary" fullWidth size="large" onClick={handleClickBuy}>
          react Bareng
        </Button>
      </Flex>
    </div>
  );
}

export default CountDown;
