import React, { useMemo } from 'react';
import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';
import RoomIcon from '@mui/icons-material/Room';
import { LocationResponseInterface } from '@routes/Address/interface';
import { ClickLocation } from './Container';
import { styPin } from './styles';

interface Props extends LocationResponseInterface {
  onClickLocation: ({ dataArea, dataSubUrb, addrText, dataCity, dataRoad }: ClickLocation) => void;
}

function ItemLocation(props: Props) {
  const {
    adm_level_1,
    adm_level_2,
    adm_level_3,
    adm_level_4,
    adm_level_5,
    adm_level_cur,
    display_txt,
    onClickLocation,
  } = props;

  const getCountry = useMemo(() => adm_level_1?.name, [adm_level_1?.name]);
  const getProvince = useMemo(() => adm_level_2?.name, [adm_level_2?.name]);
  const getCity = useMemo(() => adm_level_3?.name, [adm_level_3?.name]);
  const getSuburb = useMemo(() => adm_level_4?.name, [adm_level_4?.name]);
  const getArea = useMemo(() => adm_level_cur?.name, [adm_level_cur?.name]);

  return (
    <Flex
      width="100%"
      alignItems="flex-start"
      onClick={() =>
        onClickLocation({
          dataSubUrb: adm_level_4,
          dataArea: adm_level_5,
          addrText: display_txt,
          dataCity: adm_level_3,
          dataRoad: getArea,
        })
      }
    >
      <div className={styPin}>
        <RoomIcon style={{ color: 'rgba(174, 207, 240, 0.25)', width: '16px', height: '16px' }} />
      </div>
      <Flex
        flexDirection="column"
        width="100%"
        margin="0 0 16px 8px"
        padding="0 0 16px"
        style={{ borderBottom: 'thin solid #EDEDED' }}
      >
        <Typography fontSize="14px">{getArea}</Typography>
        <Typography fontSize="12px" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          {getSuburb},&nbsp;
          {getCity},&nbsp;
          {getProvince},&nbsp;
          {getCountry}
        </Typography>
      </Flex>
    </Flex>
  );
}

export default ItemLocation;
