import React from 'react';
import { useHistory } from 'react-router-dom';

import TopNav from '@components/TopNav';
import BottomNav from '@components/BottomNav';

import GroupList from './GroupList';

function Container() {
  const history = useHistory();

  return (
    <>
      <TopNav title="Beli Group" onBack={() => history.push('/')} />

      <div style={{ paddingBottom: '100px' }}>
        <GroupList />

        <BottomNav />
      </div>
    </>
  );
}

export default Container;
