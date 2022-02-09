import React, { useState, useContext, useCallback, useMemo, useEffect } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import lsGet from '@/helpers/client-storage/localStorageGet';

import { useToaster } from '@/context/Toaster';
import { useUserData } from '@/context/userData';
import { CheckoutContext } from '@/routes/Checkout/context/Checkout';
import useRecipient from '@routes/Checkout/hooks/useRecipient';

import Flex from '@components/Flex';
import Card from '@components/Card';
import TextField from '@components/TextField';
import TopNav from '@components/TopNav';

import Button from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

function Container() {
  const history = useHistory();
  const { showToaster } = useToaster();
  const { dataAddress, refetchAddress } = useContext(CheckoutContext);

  const lsGetAddrID = lsGet({ key: 'addr' });

  const summaryAddress = useMemo(() => {
    const getData = dataAddress.find(item =>
      lsGetAddrID ? item.id === lsGetAddrID : item.isDefault === true,
    );

    return {
      addressID: getData?.id || 0,
      recipientName: getData?.namaPenerima || '',
      recipientPhone: getData?.phoneNumberPenerima || '',
    };
  }, [dataAddress, lsGetAddrID]);

  const [penerima, setPenerima] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const {
    userInfo: { token, profileID },
  } = useUserData();
  const { onSaveRecipient, loading } = useRecipient();

  const {
    location: { search },
  } = history;

  const qs = queryString.parse(search);
  const isFromCheckout = queryString.parse(search)?.ld || '';

  useEffect(() => {
    if (summaryAddress.recipientName || summaryAddress.recipientPhone) {
      setPenerima(summaryAddress.recipientName);
      setPhone(summaryAddress.recipientPhone);
    }
  }, [summaryAddress.recipientName, summaryAddress.recipientPhone]);

  const handleChangePenerima = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPenerima(e.target.value);
  }, []);

  const handleChangePhone = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = String(val.replace(/[^0-9]/gm, ''));

    if (val.length <= 12) {
      setPhone(val);
    }
  }, []);

  const handleSaveRecipient = useCallback(() => {
    if (!penerima || !phone) {
      showToaster({
        text: 'Lengkapi data penerima dan nomor handphone',
        isError: true,
        duration: 2500,
      });
    } else {
      onSaveRecipient(
        { token, profileID, addressID: summaryAddress.addressID },
        {
          namaPenerima: penerima,
          phoneNumberPenerima: phone,
        },
        () => {
          refetchAddress();
          history.push({
            pathname: '/checkout',
            search: queryString.stringify({
              ld: isFromCheckout,
              ...qs,
            }),
          });
        },
      );
    }
  }, [
    history,
    isFromCheckout,
    onSaveRecipient,
    penerima,
    phone,
    profileID,
    qs,
    refetchAddress,
    showToaster,
    summaryAddress.addressID,
    token,
  ]);

  return (
    <div>
      <TopNav title="Data Penerima" onBack={() => history.goBack()} />

      <Card margin="32px 16px 24px">
        <Typography fontSize="16px" fontWeight="bold">
          Data Penerima
        </Typography>

        <Flex flexDirection="column" margin="24px 0 0">
          <TextField
            label="Nama Penerima"
            placeholder="Masukan Nama Penerima"
            isDark
            isSpaceBottom
            value={penerima}
            onChange={handleChangePenerima}
          />
          <TextField
            label="Nomor HP"
            placeholder="Masukan Nomor HP"
            isDark
            isSpaceBottom
            value={phone}
            onChange={handleChangePhone}
          />
        </Flex>
      </Card>

      <Flex margin="18px 16px">
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          loading={loading}
          onClick={handleSaveRecipient}
        >
          Simpan
        </Button>
      </Flex>
    </div>
  );
}

export default Container;
