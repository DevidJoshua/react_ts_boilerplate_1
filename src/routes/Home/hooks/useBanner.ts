import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { BannerResponse } from '../interface';

const API = `${API_HOST}banners?isActive=true`;

const useBanner = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataBanner, setDataBanner] = useState<Array<BannerResponse>>([]);

  const getBanner = useCallback(async () => {
    setLoading(true);
    try {
      await fetcher(API, {
        method: 'GET',
      })
        .then(result => {
          setLoading(false);
          setDataBanner(result);
        })
        .catch(error => {
          setLoading(false);
          console.warn(error);
        });
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  }, []);

  return {
    getBanner,
    dataBanner,
    loading,
  };
};

export default useBanner;
