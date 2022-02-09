import React from 'react';
import FloatingATCProvider from '@context/FloatingATC';
import Container from './Container';

function Category() {
  return (
    <FloatingATCProvider>
      <Container />
    </FloatingATCProvider>
  );
}

export default Category;
