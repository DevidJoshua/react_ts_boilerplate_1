import React, { useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import GoogleMapReact from 'google-map-react';
import { useUserData } from '@/context/userData';
import { useChooseLocation } from '@routes/Address/context/ChooseLocation';

import Form from './Form';
import TopNav from '@components/TopNav';
import PinImg from '@/assets/pin.png';

interface PropsMarker {
  lat: number;
  lng: number;
}

const Marker = (props: PropsMarker) => {
  const { lat, lng } = props;

  return (
    <div>
      <img src={PinImg} alt={`${lat}${lng}`} />
    </div>
  );
};

function AddAddress() {
  const history = useHistory();
  const {
    userInfo: { token, profileID },
  } = useUserData();
  const { dataCity, dataArea, dataSubUrb, dataText, dataRoad } = useChooseLocation();

  const {
    location: { search },
  } = history;

  const qs = queryString.parse(search);
  const isFromCheckout = queryString.parse(search)?.ld || '';

  const handleBack = () => {
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

  const getGeoLocAddress = useMemo(() => {
    const getArea = dataSubUrb.geo_coord;
    const getAreaMarker = dataArea.geo_coord;

    return {
      map: {
        center: {
          lat: getArea.lat,
          lng: getArea.lng,
        },
        zoom: 13,
      },
      marker: {
        lat: getAreaMarker.lat,
        lng: getAreaMarker.lng,
      },
    };
  }, [dataArea.geo_coord, dataSubUrb.geo_coord]);

  const handleOptionMaps = useMemo(() => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
    };
  }, []);

  useEffect(() => {
    if (!dataText) {
      history.push('/address/choose-location');
    }
  }, [dataText, history]);

  return (
    <>
      <TopNav title="Alamat" onBack={handleBack} />
      <div style={{ height: '30vh', width: '100%' }}>
        <GoogleMapReact
          options={handleOptionMaps}
          bootstrapURLKeys={{ key: 'AIzaSyDCK-7qc1CJFuy5BZY1NgAaoJnKGvMGTyg' }}
          defaultCenter={getGeoLocAddress.map.center}
          defaultZoom={getGeoLocAddress.map.zoom}
          center={[getGeoLocAddress.map.center.lat, getGeoLocAddress.map.center.lng]}
          debounced
        >
          <Marker lat={getGeoLocAddress.marker.lat} lng={getGeoLocAddress.marker.lng} />
        </GoogleMapReact>
      </div>

      <Form
        dataRoad={dataRoad}
        dataText={dataText}
        token={token}
        dataCity={dataCity}
        dataArea={dataArea}
        dataSubUrb={dataSubUrb}
        profileID={profileID}
        onClose={handleBack}
      />
    </>
  );
}

export default AddAddress;
