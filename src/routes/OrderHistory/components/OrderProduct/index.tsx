import React from 'react';

import Card from '@components/Card';

import Typography from '@mui/material/Typography';
import ItemProduct from './ItemProduct';
import { OrderLogisticResponse } from '@routes/OrderHistory/interface';
interface Props {
  itemProducts?: OrderLogisticResponse['package']['items'];
}

function Container(props: Props) {
  const { itemProducts } = props;

  const renderProduct = () => {
    if (itemProducts?.length) {
      return itemProducts.map((val, id) => {
        return (
          <ItemProduct
            key={id}
            productName={val.name}
            productImage={val.sale_event_detail?.varianPic?.url}
            productPrice={val.price * val.qty}
            productQty={val.qty}
          />
        );
      });
    }

    return null;
  };

  return (
    <Card>
      <Typography fontSize="16px" fontWeight="bold" style={{ marginBottom: '32px' }}>
        Produk yang Kamu beli
      </Typography>

      {renderProduct()}
    </Card>
  );
}

export default Container;
