import React from 'react';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';
import { syContainer } from './styles';

interface Props {
  title?: string;
  onClose?: React.MouseEventHandler;
}

function Header({ title, onClose }: Props) {
  return (
    <div className={syContainer}>
      <Typography fontWeight="bold" fontSize="16px" color="primary">
        {title}
      </Typography>
      <div onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  );
}

export default Header;
