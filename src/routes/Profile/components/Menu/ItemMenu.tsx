import React from 'react';
import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  text?: string;
  onClick?: React.MouseEventHandler;
}

function ItemMenu({ text, onClick }: Props) {
  return (
    <Flex
      margin="18px 0 0"
      onClick={onClick}
      padding="0 0 18px"
      justifyContent="space-between"
      style={{ borderBottom: 'thin solid #EDEDED' }}
    >
      <Typography fontSize="16px" fontWeight="bold">
        {text}
      </Typography>
      <ChevronRightIcon />
    </Flex>
  );
}

export default ItemMenu;
