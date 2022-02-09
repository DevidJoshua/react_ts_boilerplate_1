import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import lsSet from '@/helpers/client-storage/localStorageSet';
import useGetProductFree from '@/routes/Sharereact/hooks/useGetProductFree';

import Modal from '@components/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImgPopup from '@/assets/free-product.png';

import ProductFree from './ProductFree';
import { styBoxmodal, styBoxPurple } from './styles';

interface Props {
  isLoggedIn: boolean;
  isPopRegis: boolean;
}

function PopupProduct(props: Props) {
  const { isLoggedIn, isPopRegis } = props;

  const history = useHistory();
  const [show, setShow] = useState<boolean>(true);

  const { getProductFree, dataProductFree } = useGetProductFree();

  useEffect(() => {
    if (isPopRegis && isLoggedIn) {
      getProductFree();
    }
  }, [getProductFree, isLoggedIn, isPopRegis]);

  const handleClose = () => {
    setShow(false);
    if (!isPopRegis) {
      lsSet({ key: 'react-pop-nonregist-uid', value: true });
    } else {
      lsSet({ key: 'react-pop-regist-uid', value: true });
    }
  };

  const handleClickRegister = () => {
    history.push('/register');
    lsSet({ key: 'react-pop-nonregist-uid', value: true });
  };

  const handleClickShare = () => {
    history.push('/share-react/progress');
    lsSet({ key: 'react-pop-regist-uid', value: true });
  };

  const renderContent = () => {
    if (!isLoggedIn && !isPopRegis) {
      return (
        <>
          <div className={styBoxPurple}>
            <Typography color="secondary" fontSize="16px" fontWeight="bold">
              Ayo gabung bersama react, <br />
              bagikan react dan dapatkan produk gratis
            </Typography>
          </div>

          <Button
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickRegister}
          >
            Daftar Yuk
          </Button>
        </>
      );
    }

    if (isLoggedIn && isPopRegis) {
      return (
        <>
          <div className={styBoxPurple} style={{ margin: '0 0 12px' }}>
            <Typography color="secondary" fontSize="14px" fontWeight="bold">
              Yukk bagikan react dan dapatkan produk gratis
            </Typography>
          </div>

          <ProductFree dataProduct={dataProductFree} />

          <Button
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickShare}
          >
            Bagikan react
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div className={styBoxmodal}>
        <img src={ImgPopup} />

        {renderContent()}
      </div>
    </Modal>
  );
}

export default PopupProduct;
