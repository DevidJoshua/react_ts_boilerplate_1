import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { SearchResponse } from '../interface';

const API = `${API_HOST}sale-event-details/search/base?text=`;

const useSearch = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSearch, setDataSearch] = useState<Array<SearchResponse>>([]);

  const getSearch = useCallback(async (search: string) => {
    try {
      setLoading(true);
      await fetcher(`${API}${search}`, {
        method: 'GET',
      })
        .then(result => {
          setLoading(false);
          setDataSearch(result);
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
    getSearch,
    dataSearch,
    loading,
  };
};

export default useSearch;
