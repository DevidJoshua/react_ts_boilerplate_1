export interface LevelLocationResponseInterFace {
  id: number;
  level: number;
  type: string;
  name: string;
}

export interface Level1LocationResponseInterface extends LevelLocationResponseInterFace {
  code: string;
}

export interface LevelWithGeoResponseInterface extends LevelLocationResponseInterFace {
  geo_coord: {
    lat: number;
    lng: number;
  };
  postcode: string;
}

export interface LocationResponseInterface {
  adm_level_1: Level1LocationResponseInterface;
  adm_level_2: LevelLocationResponseInterFace;
  adm_level_3: LevelWithGeoResponseInterface;
  adm_level_4: LevelWithGeoResponseInterface;
  adm_level_5: LevelWithGeoResponseInterface;
  adm_level_cur: LevelWithGeoResponseInterface;
  display_txt: string;
  postcodes: string[];
}

export interface LocationFullResponseInterface {
  metadata: {
    path: string;
    http_status_code: number;
    http_status: string;
    timestamp: number;
  };
  data: LocationResponseInterface[];
  pagination: {
    current_page: number;
    current_elements: number;
    total_pages: number;
    total_elements: number;
  };
}

export interface SaveAddressResponse {
  id: number;
}

export const defaultPropsLocationFull = {
  metadata: {
    path: '',
    http_status_code: 0,
    http_status: '',
    timestamp: 0,
  },
  data: [],
  pagination: {
    current_page: 0,
    current_elements: 0,
    total_pages: 0,
    total_elements: 0,
  },
};
