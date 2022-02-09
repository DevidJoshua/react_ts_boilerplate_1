import React, { useState, useCallback  } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@components/Card';
import Flex from '@components/Flex';
import TextField from '@components/TextField';
import BottomNav from '@components/BottomNav';
import TopNav from '@components/TopNav';
import { useToaster } from '@/context/Toaster';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Container() {
  const history = useHistory();
  const { showToaster } = useToaster();

  const [namebank, setNameBank] = useState<string>('');
  const [norek, setNorek] = useState<string>('');
  const [namepemegang, setNamePemegang] = useState<string>('');

  const handleChangeNameBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameBank(e.target.value);
  };
  const handleChangeNoRek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNorek(e.target.value);
  };
  const handleChangeNamePemegang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamePemegang(e.target.value);
  };

  const handleClickSimpan = useCallback(() => {
    if (!namebank || !norek) {
      showToaster({
        text: 'Silahakan lengkapi form di atas terlebih dahulu',
        isError: true,
        duration: 2500,
      });
    } else {
      handleClickSimpan(
        
      );
    }
  }, []);

  return (
    <>
      <TopNav title="Refund" onBack={() => history.goBack()} />

      <div style={{ paddingBottom: '100px' }}>
        <div style={{ marginTop: '32px' }}>
          <Card>
            <Typography fontSize="16px" fontWeight="bold">
              Rekening Penerima
            </Typography>

            <Flex flexDirection="column" margin="18px 0 0">
              <TextField 
                label="Nama Bank" 
                placeholder="Nama Bank" 
                isDark 
                isSpaceBottom
                onChange={handleChangeNameBank}
                value={namebank}
              />
              <TextField 
                label="Nomor Rekening" 
                placeholder="Nomor Rekening" 
                isDark 
                isSpaceBottom 
                onChange={handleChangeNoRek}
                value={norek}
              />
              <TextField
                label="Nama Pemegang Rekening"
                placeholder="Nama Pemegang Rekening"
                isDark
                isSpaceBottom
                onChange={handleChangeNamePemegang}
                value={namepemegang}
              />
            </Flex>
          </Card>

          <Flex margin="32px 16px">
            <Button
              variant="contained" 
              size="large" 
              color="primary" 
              fullWidth
              onClick={handleClickSimpan}
            >
              Simpan
            </Button>
          </Flex>
        </div>

        <BottomNav />
      </div>
    </>
  );
}

export default Container;
