import React from 'react';
import CheckoutProvider from '@routes/Checkout/context/Checkout';
import RoutesCart from './Routes';

function Checkout() {
  return (
    <CheckoutProvider>
      <RoutesCart />
    </CheckoutProvider>
  );
}

export default Checkout;
