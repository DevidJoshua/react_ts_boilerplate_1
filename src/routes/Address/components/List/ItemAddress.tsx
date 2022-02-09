import React from 'react';
import { cx } from 'emotion';
import Flex from '@components/Flex';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';

import RoomIcon from '@mui/icons-material/Room';

import { styItemAddress } from './styles';

interface Props {
  isActive?: null | boolean;
  isPrimary?: null | boolean;
  addressID: number;
  addressType?: string;
  detailAddress?: string;
  area?: string;
  district?: string;
  postalCode?: string;
  isFromCheckout?: boolean;
  checked?: number;
  setChecked: React.Dispatch<React.SetStateAction<number>>;
  onClickDefaultAddr: (params: number) => void;
}

function ItemAddress(props: Props) {
  const {
    addressType,
    isPrimary,
    isActive,
    detailAddress,
    area,
    district,
    postalCode,
    addressID,
    isFromCheckout,
    setChecked,
    checked,
    onClickDefaultAddr,
  } = props;

  const handleChooseAddress = () => {
    setChecked(addressID);
  };

  return (
    <div
      className={cx(styItemAddress, { active: isActive && !isFromCheckout })}
      onClick={handleChooseAddress}
    >
      {isFromCheckout && <Radio checked={addressID === checked} value={addressID} />}

      <div style={{ width: '100%' }}>
        <Typography fontSize="16px" fontWeight="bold" color="primary">
          {addressType}
        </Typography>
        <Flex justifyContent="space-between" alignItems="flex-start" width="100%">
          <Flex alignItems="flex-start" margin="8px 0 0">
            <RoomIcon />
            <div className="detail-address">
              <Typography fontSize="14px" color="primary">
                {detailAddress}, {area}, {district}, {postalCode}
              </Typography>
            </div>
          </Flex>
          {!isFromCheckout &&
            (isPrimary ? (
              <Chip label="Utama" style={{ backgroundColor: '#6556D9', color: '#ffffff' }} />
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onClickDefaultAddr(addressID)}
              >
                Pilih Alamat
              </Button>
            ))}
        </Flex>
      </div>
    </div>
  );
}

export default ItemAddress;
