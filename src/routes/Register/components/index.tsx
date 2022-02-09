import React from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import TopNav from '@components/TopNav';
import BottomNav from '@components/BottomNav';
import Form from './Form';

function Register() {
  const history = useHistory();

  const {
    location: { search },
  } = history;

  const getRefNumber = queryString.parse(search)?.ref || '';

  return (
    <div style={{ paddingBottom: '150px' }}>
      <TopNav title="Daftar" onBack={() => history.goBack()} />

      <Form refNo={String(getRefNumber)} />

      <BottomNav />
    </div>
  );
}

export default Register;
