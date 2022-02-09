import React from 'react';
import { useHistory } from 'react-router-dom';
import Flex from '@components/Flex';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconBored from '@/assets/icon-bored.png';

function ErrorView() {
  const history = useHistory();

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" margin="30px 0 0">
      <img src={IconBored} alt="404" width="150px" />
      <Flex flexDirection="column" margin="0 16px">
        <Typography fontWeight="bold" fontSize="16px" marginTop="12px" textAlign="center">
          Oops, halaman tidak tersedia
        </Typography>
        <Typography fontSize="14px" marginTop="12px" marginBottom="18px" textAlign="center">
          Pastikan link yang kamu masukan benar
        </Typography>
        <Button variant="contained" color="primary" onClick={() => history.push('/')}>
          Kembali Ke Halaman Utama
        </Button>
      </Flex>
    </Flex>
  );
}

export default ErrorView;
