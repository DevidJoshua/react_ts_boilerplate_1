import React from 'react';
import { useHistory } from 'react-router-dom';

import TopNav from '@components/TopNav';
import BottomNav from '@/components/BottomNav';

import Container from './Container';

function Notification() {
  const history = useHistory();

  return (
    <>
      <TopNav title="Notifikasi" onBack={() => history.push('/')} />

      <div style={{ paddingBottom: '100px' }}>
        <Container />
        <BottomNav />
      </div>
    </>
  );
}

export default Notification;
