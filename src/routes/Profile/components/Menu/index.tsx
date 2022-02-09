import React from 'react';
import { useHistory } from 'react-router-dom';
import Flex from '@components/Flex';
import ItemMenu from './ItemMenu';

function Menu() {
  const history = useHistory();

  const MENU = [
    {
      text: 'Pesanan Kamu',
      onClick: () => history.push('/order-history/list'),
    },
    {
      text: 'Alamat',
      onClick: () => history.push('/address/list'),
    },
    {
      text: 'Refund',
      onClick: () => history.push('/refund'),
    },
    {
      text: 'Pusat Bantuan',
      onClick: () => {},
    },
  ];

  return (
    <Flex margin="0 16px 0" flexDirection="column">
      {MENU.map((val, id) => (
        <ItemMenu key={id} text={val.text} onClick={val.onClick} />
      ))}
    </Flex>
  );
}

export default Menu;
