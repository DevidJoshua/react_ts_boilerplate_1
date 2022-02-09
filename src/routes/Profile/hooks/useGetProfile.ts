import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { ProfileResponse } from '../interface';

const API = `${API_HOST}profiles/`;

const useGetProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataProfile, setDataProfile] = useState<ProfileResponse>();

  const getProfile = useCallback(async (token: string, profileID: number) => {
    setLoading(true);
    if (token && profileID) {
      await fetcher(`${API}${profileID}`, {
        method: 'GET',
        token,
      })
        .then(result => {
          setLoading(false);
          setDataProfile(result);
        })
        .catch(error => {
          setLoading(false);
          console.warn(error);
        });
    }
  }, []);

  return {
    getProfile,
    dataProfile,
    loading,
  };
};

export default useGetProfile;
