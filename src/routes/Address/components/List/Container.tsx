import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import lsSet from '@/helpers/client-storage/localStorageSet';

import { useToaster } from '@/context/Toaster';
import { useUserData } from '@/context/userData';
import useSetDefault from '@routes/Address/hooks/useSetDefault';
import useGetListAddress from '@routes/Address/hooks/useGetListAddress';

import Flex from '@components/Flex';
import BottomNav from '@/components/BottomNav';
import TopNav from '@components/TopNav';

import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import ItemAddress from './ItemAddress';
import Loader from './Loader';

function ListAddress() {
  const history = useHistory();
  const {
    location: { search },
  } = history;

  const [checked, setChecked] = useState<number>(0);

  const {
    userInfo: { token, profileID },
  } = useUserData();
  const { getAddress, dataAddress, loading } = useGetListAddress();
  const { onSetDefault } = useSetDefault();
  const { showToaster } = useToaster();

  const qs = queryString.parse(search);
  const isFromCheckout = queryString.parse(search)?.ld || '';

  useEffect(() => {
    getAddress({ token, profileID });
  }, [getAddress, profileID, token]);

  const handleClickDefaultAddr = (id: number) => {
    onSetDefault(
      {
        token,
        profileID,
        body: JSON.stringify({
          id,
          isDefault: true,
        }),
      },
      (isTrue: boolean) => {
        if (isTrue) {
          setTimeout(() => {
            getAddress({ token, profileID });
          }, 500);
        } else {
          showToaster({
            text: 'Terjadi kesalahan, silahkan coba lagi',
            isError: true,
            duration: 2000,
          });
        }
      },
    );
  };

  const handleBack = () => {
    if (isFromCheckout) {
      history.push({
        pathname: String(isFromCheckout),
        search: queryString.stringify({ ...qs }),
      });
    } else {
      history.push('/');
    }
  };

  const handleClickAddAddr = () => {
    if (isFromCheckout) {
      history.push({
        pathname: '/address/choose-location',
        search: queryString.stringify({
          ld: String(isFromCheckout),
          ...qs,
        }),
      });
    } else {
      history.push('/address/choose-location');
    }
  };

  const handleClickChooseAddr = () => {
    lsSet({ key: 'addr', value: checked });

    history.push({
      pathname: String(isFromCheckout),
      search: queryString.stringify({
        ...qs,
      }),
    });
  };

  const renderItem = () => {
    if (!loading && dataAddress.length > 0) {
      return dataAddress.map((item, id) => {
        return (
          <ItemAddress
            key={id}
            isFromCheckout={Boolean(isFromCheckout)}
            checked={checked}
            setChecked={setChecked}
            addressID={item.id}
            addressType={item.addrType}
            detailAddress={item.addrLine1}
            area={item.area}
            district={item.suburb}
            postalCode={item.postalCode}
            isPrimary={item.isDefault}
            isActive={item.isDefault}
            onClickDefaultAddr={handleClickDefaultAddr}
          />
        );
      });
    }

    return <Loader />;
  };

  return (
    <>
      <TopNav title="Pilih Alamat" onBack={handleBack} />

      <div style={{ paddingBottom: '100px' }}>
        {loading ? (
          <Loader />
        ) : (
          <Flex margin="0 0 18px" flexDirection="column">
            {renderItem()}
          </Flex>
        )}

        <Flex margin="0 16px" justifyContent="center" alignItems="center">
          <Button
            variant="text"
            size="large"
            startIcon={<AddOutlinedIcon />}
            onClick={handleClickAddAddr}
          >
            Tambah Alamat
          </Button>
        </Flex>

        {!isFromCheckout && <BottomNav />}
      </div>

      {isFromCheckout && (
        <Flex
          padding="0 16px"
          style={{
            position: 'fixed',
            width: '100%',
            bottom: '16px',
            left: 0,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleClickChooseAddr}
            disabled={checked === 0}
          >
            Pilih Alamat
          </Button>
        </Flex>
      )}
    </>
  );
}

export default ListAddress;
