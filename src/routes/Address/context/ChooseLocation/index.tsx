import React, { FC, createContext, useState, useContext } from 'react';
import { LocationResponseInterface } from '@routes/Address/interface';

interface LocationContext {
  dataCity: LocationResponseInterface['adm_level_3'];
  dataSubUrb: LocationResponseInterface['adm_level_4'];
  dataArea: LocationResponseInterface['adm_level_5'];
  dataText: LocationResponseInterface['display_txt'];
  dataRoad: string;
  setDataCity: React.Dispatch<React.SetStateAction<LocationResponseInterface['adm_level_3']>>;
  setDataSubUrb: React.Dispatch<React.SetStateAction<LocationResponseInterface['adm_level_4']>>;
  setDataArea: React.Dispatch<React.SetStateAction<LocationResponseInterface['adm_level_5']>>;
  setDataText: React.Dispatch<React.SetStateAction<LocationResponseInterface['display_txt']>>;
  setDataRoad: React.Dispatch<React.SetStateAction<string>>;
}

const defaultPropsArea = {
  id: 0,
  level: 0,
  type: '',
  name: '',
  geo_coord: {
    lat: 0,
    lng: 0,
  },
  postcode: '',
};

const ChooseLocationContext = createContext<LocationContext>({
  dataCity: defaultPropsArea,
  dataSubUrb: defaultPropsArea,
  dataArea: defaultPropsArea,
  dataText: '',
  dataRoad: '',
  setDataCity: () => {},
  setDataSubUrb: () => {},
  setDataArea: () => {},
  setDataText: () => {},
  setDataRoad: () => {},
});

const ChooseLocationProvider: FC = ({ children }) => {
  const [dataCity, setDataCity] =
    useState<LocationResponseInterface['adm_level_3']>(defaultPropsArea);
  const [dataSubUrb, setDataSubUrb] =
    useState<LocationResponseInterface['adm_level_4']>(defaultPropsArea);
  const [dataArea, setDataArea] =
    useState<LocationResponseInterface['adm_level_5']>(defaultPropsArea);
  const [dataText, setDataText] = useState<LocationResponseInterface['display_txt']>('');
  const [dataRoad, setDataRoad] = useState<string>('');

  const state = {
    dataCity,
    dataSubUrb,
    dataArea,
    dataText,
    dataRoad,
    setDataCity,
    setDataSubUrb,
    setDataArea,
    setDataText,
    setDataRoad,
  };

  return <ChooseLocationContext.Provider value={state}>{children}</ChooseLocationContext.Provider>;
};

export const useChooseLocation = () => useContext(ChooseLocationContext);

export default ChooseLocationProvider;
