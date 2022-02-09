import React, { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { useUserData } from '@/context/userData';
import useGetCart from '@hooks/useGetCart';
import useGetGroup from '@routes/Groups/hooks/useGetGroup';
import LoaderLoadable from '@/components/LoaderLoadable';
import ErrorData from '@components/ErrorView/ErrorData';

import GroupItem from './GroupItem';
import EmptyGroup from './EmptyGroup';
import { styContainer } from './styles';

dayjs.extend(utc);

function GroupList() {
  const {
    userInfo: { token, profileID },
  } = useUserData();

  const { dataCart } = useGetCart(true);
  const { getGroup, dataGroup, loading, error } = useGetGroup();

  useEffect(() => {
    getGroup(token);
  }, [getGroup, token]);

  const renderItemGroup = useMemo(() => {
    const filterDataGroup =
      dataGroup.filter(
        val =>
          dayjs(dayjs(val.expiredTime).utc().format('DD MMM YYYY HH:mm')).isAfter(dayjs()) &&
          val.purchase_order_bs.some(pob => pob.cust_profile !== profileID),
      ) || [];

    if (filterDataGroup.length > 0) {
      return filterDataGroup.map((val, id) => {
        return (
          <GroupItem
            key={id}
            groupID={val.id}
            expiredTime={val.expiredTime}
            ownerGroup={val.profiles}
            products={val.product_varian}
            productGroup={val.sale_event_detail}
            groupPrice={val.gross_amount}
            dataCart={dataCart}
          />
        );
      });
    }

    return <EmptyGroup />;
  }, [dataCart, dataGroup, profileID]);

  if (loading) {
    return <LoaderLoadable />;
  }

  if (!loading && error) {
    return <ErrorData />;
  }

  return <div className={styContainer}>{renderItemGroup}</div>;
}

export default GroupList;
