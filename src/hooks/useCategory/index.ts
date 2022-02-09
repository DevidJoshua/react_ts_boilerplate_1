import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '../../helpers/fetcher';
import { CategoryResponse } from './interface';

const API_CATEGORY = `${API_HOST}categories?isGroup=true`;

const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataCategory, setDataCategory] = useState<Array<CategoryResponse>>([]);

  const getCategory = useCallback(async () => {
    setLoading(true);
    await fetcher(API_CATEGORY, {
      method: 'GET',
    })
      .then(result => {
        setLoading(false);
        setDataCategory(result);
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });
  }, []);

  return {
    getCategory,
    dataCategory,
    loading,
  };
};

export default useCategory;
