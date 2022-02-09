import React from 'react';
import { Helmet } from 'react-helmet-async';
import FloatingATCProvider from '@context/FloatingATC';
import Container from './Container';

function Home() {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Ayo gabung bersama react sekarang juga dan dapatkan hadiah menarik di react"
        />
      </Helmet>
      <FloatingATCProvider>
        <Container />
      </FloatingATCProvider>
    </>
  );
}

export default Home;
