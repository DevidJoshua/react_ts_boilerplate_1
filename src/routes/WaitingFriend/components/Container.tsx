import React, { useEffect, useMemo } from 'react';
import { HOSTNAME } from '@config';
import { Helmet } from 'react-helmet-async';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import useWaitingFriend from '@routes/WaitingFriend/hooks/useWaitingFriend';

import Flex from '@components/Flex';
import Button from '@mui/material/Button';
import TopNav from '@components/TopNav';
import BottomNav from '@/components/BottomNav/components';
import LoaderLoadable from '@/components/LoaderLoadable';

import Product from './Product';
import CountDown from './CountDown';

function Container() {
  const history = useHistory();
  const { location } = history;
  const { search } = location;

  const getGroupID = queryString.parse(search)?.group || '';

  const { getWaitingFriend, dataWaitingFriend, loading } = useWaitingFriend();

  useEffect(() => {
    if (getGroupID) {
      getWaitingFriend(String(getGroupID));
    }
  }, [getGroupID, getWaitingFriend]);

  useEffect(() => {
    if (!loading && dataWaitingFriend?.items?.length === 0) {
      history.push('/');
    }
  }, [dataWaitingFriend?.items?.length, history, loading]);

  useEffect(() => {
    if (!getGroupID) {
      history.push('/');
    }
  }, [getGroupID, history]);

  useEffect(() => {
    if (!loading && dataWaitingFriend?.flagFullGroup) {
      history.push({
        pathname: '/full-group',
        search: queryString.stringify({
          from: 'share',
          group: getGroupID,
        }),
      });
    }
  }, [dataWaitingFriend?.flagFullGroup, getGroupID, history, loading]);

  const getFirstImg = useMemo(() => {
    const getImg = dataWaitingFriend?.items.find((_, key) => key === 0)?.product_varian.varianPic
      .url;
    return getImg;
  }, [dataWaitingFriend?.items]);

  if (loading) {
    return <LoaderLoadable />;
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>react - react Bareng</title>
        <meta
          name="title"
          content={`${(dataWaitingFriend?.buyers_name || ['']).join('&')} ngundang kamu nih"`}
        />
        <meta
          name="description"
          content="Yuk, react bareng sama teman kamu, harga nya jadi lebih murah loh"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${HOSTNAME}waiting-friend?group=${String(getGroupID)}`} />
        <meta
          property="og:title"
          content={`${(dataWaitingFriend?.buyers_name || ['']).join('&')} ngundang kamu nih"`}
        />
        <meta
          property="og:description"
          content="Yuk, react bareng sama teman kamu, harga nya jadi lebih murah loh"
        />
        <meta property="og:image" content={getFirstImg} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`${HOSTNAME}waiting-friend?group=${String(getGroupID)}`}
        />
        <meta
          property="twitter:title"
          content={`${(dataWaitingFriend?.buyers_name || ['']).join('&')} ngundang kamu nih"`}
        />
        <meta
          property="twitter:description"
          content="Yuk, react bareng sama teman kamu, harga nya jadi lebih murah loh"
        />
        <meta property="twitter:image" content={getFirstImg} />
      </Helmet>

      <TopNav title="react Bareng" onBack={() => history.push('/')} />

      <div style={{ paddingBottom: '150px' }}>
        <CountDown
          buyerName={dataWaitingFriend?.buyers_name}
          expiredTime={dataWaitingFriend?.expiredTime}
          products={dataWaitingFriend?.items}
        />

        <Product buyerName={dataWaitingFriend?.buyers_name} products={dataWaitingFriend?.items} />

        <Flex margin="18px 16px">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            onClick={() => history.push('/')}
          >
            Batalkan
          </Button>
        </Flex>

        <BottomNav />
      </div>
    </>
  );
}

export default Container;
