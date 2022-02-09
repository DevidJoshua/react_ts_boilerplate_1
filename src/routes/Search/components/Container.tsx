import React from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import BottomNav from '@/components/BottomNav';
import TopNav from '@components/TopNav';
import Flex from '@components/Flex';

import Typography from '@mui/material/Typography';
import ProductList from './ProductList';

function Container() {
  const history = useHistory();

  const {
    location: { search },
  } = history;

  const getExistSearch = String(queryString.parse(search)?.q || '');

  return (
    <>
      <TopNav isSearchCart onBack={() => history.push('/')} />

      <Flex flexDirection="column" padding="0 16px 120px" margin="24px 0">
        <Typography color="primary" fontSize="14px">
          Menampilkan untuk hasil pencarian <strong>{`"${getExistSearch}"`}</strong>
        </Typography>

        <ProductList valueSearch={getExistSearch} />
      </Flex>

      <BottomNav />
    </>
  );
}

export default Container;
