import React, { useState } from 'react';
import { API_HOST } from '@config';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import fetcher from '@/helpers/fetcher';
import { useToaster } from '@/context/Toaster';

import Flex from '@components/Flex';
import BottomSheet from '@/components/BottomSheet';
import Header from '@/components/BottomSheet/Header';
import TextField from '@/components/TextField';

import Button from '@mui/lab/LoadingButton';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

import { LocationResponseInterface, SaveAddressResponse } from '@routes/Address/interface';
import { saveAddressAs } from '../constant';

const API_ADD_ADDRESS = `${API_HOST}addresses`;

interface Props {
  dataRoad: string;
  dataText: string;
  token: string;
  dataCity: LocationResponseInterface['adm_level_3'];
  dataSubUrb: LocationResponseInterface['adm_level_4'];
  dataArea: LocationResponseInterface['adm_level_5'];
  profileID: number;
  onClose: () => void;
}

function Form(props: Props) {
  const { dataRoad, dataText, token, dataCity, dataArea, dataSubUrb, profileID, onClose } = props;

  const history = useHistory();
  const { showToaster } = useToaster();

  const [loading, setLoading] = useState<boolean>(false);
  const [typeAddr, setTypeAddr] = useState<number>(1);
  const [valueSpecific, setValueSpecific] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');

  const {
    location: { search },
  } = history;

  const qs = queryString.parse(search);
  const isFromCheckout = queryString.parse(search)?.ld || '';

  const handleClickAddAddress = async () => {
    if (!detailAddress || !valueSpecific) {
      showToaster({
        text: 'Lengkapi detail alamat terlebih dahulu, ya!',
        isError: true,
        duration: 3000,
      });
    } else {
      setLoading(true);
      await fetcher(API_ADD_ADDRESS, {
        method: 'POST',
        token,
        body: JSON.stringify({
          latitude: dataArea.geo_coord.lat,
          longitude: dataArea.geo_coord.lng,
          specificGuide: valueSpecific,
          addrLine1: detailAddress,
          postalCode: dataArea.postcode,
          addrType: saveAddressAs.find(item => item.id === typeAddr)?.text,
          user_profile: profileID,
          title: saveAddressAs.find(item => item.id === typeAddr)?.text,
          suburb: dataSubUrb.name,
          suburbId: String(dataSubUrb.id),
          area: dataArea.name,
          areaId: String(dataArea.id),
          cityId: String(dataCity.id),
        }),
      })
        .then((result: SaveAddressResponse) => {
          if (result.id) {
            showToaster({
              text: 'Alamat berhasil ditambahkan.',
              isError: false,
              duration: 3000,
            });

            if (isFromCheckout) {
              history.push({
                pathname: '/address/list',
                search: queryString.stringify({
                  ld: isFromCheckout,
                  ...qs,
                }),
              });
            } else {
              history.push('/address/list');
            }
          } else {
            showToaster({
              text: 'Terjadi kesalahan, silahkan coba lagi',
              isError: true,
              duration: 3000,
            });
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          showToaster({
            text: 'Terjadi kesalahan, silahkan coba lagi',
            isError: true,
            duration: 3000,
          });
        });
    }
  };

  const handleChangeDetailAddr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  const handleChangeSpecific = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSpecific(e.target.value);
  };

  return (
    <BottomSheet header={false} open blocking={false}>
      <Header title="Alamat Kamu" onClose={onClose} />

      <Flex
        style={{ backgroundColor: 'rgba(162, 181, 200, 0.1)' }}
        padding="16px"
        margin="0 0 12px"
        alignItems="center"
      >
        <Flex
          style={{ backgroundColor: '#000', borderRadius: '50%', width: '32px', height: '28px' }}
          alignItems="center"
          justifyContent="center"
        >
          <HomeIcon style={{ color: '#fff' }} />
        </Flex>
        <Flex flexDirection="column" width="100%" padding="0 0 0 12px">
          <Typography fontSize="14px" fontWeight="bold">
            {dataRoad}
          </Typography>
          <Typography fontSize="12px">{dataText}</Typography>
        </Flex>
      </Flex>

      <Flex margin="0 16px" flexDirection="column">
        <TextField
          label="Detail Alamat"
          placeholder="Masukan detail alamat"
          isDark
          isSpaceBottom
          value={detailAddress}
          onChange={handleChangeDetailAddr}
        />
        <TextField
          label="Patokan"
          placeholder="Masukan patokan jalan/rumah"
          isDark
          isSpaceBottom
          value={valueSpecific}
          onChange={handleChangeSpecific}
        />

        <Flex flexDirection="column">
          <Typography fontSize="14px" color="primary">
            Simpan Sebagai
          </Typography>
          <Flex margin="8px 0 8px">
            {saveAddressAs.map((val, id) => {
              return (
                <Chip
                  key={id}
                  label={val.text}
                  style={{ marginRight: '8px' }}
                  clickable
                  onClick={() => setTypeAddr(val.id)}
                  color={typeAddr === val.id ? 'primary' : 'default'}
                />
              );
            })}
          </Flex>
          {typeAddr === 3 && (
            <TextField placeholder="Misal: Kos, rumah nenek." isDark isSpaceBottom />
          )}
        </Flex>
      </Flex>

      <Flex margin="8px 16px 18px">
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          loading={loading}
          onClick={handleClickAddAddress}
        >
          Simpan Alamat
        </Button>
      </Flex>
    </BottomSheet>
  );
}

export default Form;
