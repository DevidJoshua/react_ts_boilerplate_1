import React, { useEffect } from 'react';

import { useUserData } from '@/context/userData';
import useNotification from '@routes/Notification/hooks/useNotification';

import Flex from '@components/Flex';
import LoaderLoadable from '@/components/LoaderLoadable';

import ItemNotification from './ItemNotification';
import EmptyNotification from './EmptyNotification';

function Container() {
  const {
    userInfo: { token, profileID },
  } = useUserData();
  const { getNotification, dataNotification, loading } = useNotification();

  useEffect(() => {
    getNotification(token, profileID);
  }, [getNotification, profileID, token]);

  if (loading) {
    return <LoaderLoadable />;
  }

  if (!loading && !dataNotification.length) {
    return <EmptyNotification />;
  }

  return (
    <Flex flexDirection="column">
      {dataNotification.map(val => {
        return (
          <ItemNotification
            key={val.id}
            notifID={val.id}
            isRead={val.isRead}
            publishDate={val.published_at}
            message={val.messages}
            token={token}
          />
        );
      })}
    </Flex>
  );
}

export default Container;
