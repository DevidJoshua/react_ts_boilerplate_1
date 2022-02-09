import React, { FC } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { ModalProps } from '@mui/material';
import Fade from '@mui/material/Fade';
import { styBoxmodal } from './styles';

interface Props extends ModalProps {
  withBackground?: boolean;
}

const Modals: FC<Props> = ({ withBackground, open, children, ...otherProps }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...otherProps}
    >
      {withBackground ? (
        <Fade in={open}>
          <div className={styBoxmodal}>{children}</div>
        </Fade>
      ) : (
        <Fade in={open}>{children}</Fade>
      )}
    </Modal>
  );
};

export default Modals;
