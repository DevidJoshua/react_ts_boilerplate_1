import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { ProductListResponse,ParamsData, ParameterData } from '../interface';

const API_PRODUCTS = `${API_HOST}sale-event-details/category/`;
interface ParamsDataAll{
  categoryID:string
  subCategoryId:string
  page:number
  size:number
}
const useGetProductByCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataProduct, setDataProduct] = useState<Array<ProductListResponse>>([]);
  
  const getProduct = useCallback(async (props:ParamsDataAll) => {
    
    const {categoryID,subCategoryId,page,size} = props

    var url = ''
    if(subCategoryId == undefined) url = `${API_PRODUCTS}${categoryID}`
    else url = `${API_PRODUCTS}${categoryID}/${subCategoryId}`
    url += `?page=${page}&limit=${size}`

    setLoading(true);
    await fetcher(url, {
      method: 'GET',
    })
      .then(result => {
        setLoading(false);
        setDataProduct([result.data])
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });
  }, []);

  return {
    setDataProduct,
    getProduct,
    dataProduct,
    loading,
  };
};

export default useGetProductByCategory;
