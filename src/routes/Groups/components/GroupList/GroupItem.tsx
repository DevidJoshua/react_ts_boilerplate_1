import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import toIDR from '@/helpers/toIDR';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';

import { CartItemResponseInterface } from '@hooks/useGetCart/interface';

import Flex from '@components/Flex';
import Timer from '@/components/Timer';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

import ImgProfile from '@/assets/dummy-profile.png';
import { GroupOrderItemResponse } from '@routes/Groups/interface';
import { styGroupItem } from './styles';

dayjs.extend(dayjsPluginUTC);
interface Props {
  groupID: number;
  ownerGroup?: string;
  products?: GroupOrderItemResponse['product_varian'];
  productGroup?: GroupOrderItemResponse['sale_event_detail'];
  groupPrice?: number;
  expiredTime?: string;
  dataCart?: CartItemResponseInterface[];
}

function GroupItem(props: Props) {
  const { groupID, ownerGroup, groupPrice = 0, products = [], expiredTime = '' } = props;
  const history = useHistory();

  const timeExpired = useMemo(() => {
    const formatted = dayjs(expiredTime).utc().format('DD MMM YYYY HH:mm:ss');
    const parseDate = dayjs(formatted).valueOf();
    return parseDate;
  }, [expiredTime]);

  const getProducts = products?.map(val => val.name).join(' + ');

  const handleClickGroup = () => {
    history.push({
      pathname: '/checkout',
      search: queryString.stringify({
        group: groupID,
        from: '/group',
      }),
    });
  };

  return (
    <div className={styGroupItem}>
      <ListItemButton
        onClick={handleClickGroup}
        style={{
          padding: '16px 0 16px 0',
        }}
      >
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <Avatar
            alt={ownerGroup}
            src={ImgProfile}
            style={{
              marginBottom: '-8px',
              zIndex: -1,
            }}
          />
          <Timer date={timeExpired} variant="smallPurple" />
        </Flex>

        <div className="content">
          <div className="info-group">
            <Typography fontWeight="bold" color="primary" fontSize="16px">
              {ownerGroup}
            </Typography>
            <Typography color="primary" fontSize="14px">
              {getProducts}
            </Typography>
          </div>
          <Typography fontWeight="bold" color="primary" fontSize="14px">
            {toIDR(groupPrice)}
          </Typography>
        </div>
      </ListItemButton>
    </div>
  );
}

export default GroupItem;
