import React from 'react';
import FloatingATCProvider from '@context/FloatingATC';
import Container from './Container';

function Search() {
  return (
    <FloatingATCProvider>
      <Container />
    </FloatingATCProvider>
  );
}

export default Search;
