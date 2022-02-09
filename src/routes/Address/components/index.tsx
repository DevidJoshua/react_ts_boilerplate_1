import React from 'react';
import ChooseLocationProvider from '@routes/Address/context/ChooseLocation';
import Container from './Container';

function Address() {
  return (
    <ChooseLocationProvider>
      <Container />
    </ChooseLocationProvider>
  );
}

export default Address;
