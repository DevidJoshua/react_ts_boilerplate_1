import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { CoveredAddressResponse } from '@routes/Checkout/interface/coveredAddress';

const API = `${API_HOST}setting`;

const defaultCoveredValue = {
  id: 0,
  promoSaleEventID: '',
  baseSaleEventID: '',
  isLogisticByreact: false,
  coverageCities: {
    citiesId: [],
  },
  newCustomerRewardPoint: 0,
  maxGroupBuyer: 0,
  mgmRewardPoint: 0,
};

const useCoveredAddress = () => {
  const [dataCoveredAddress, setDataCoveredAddress] =
    useState<CoveredAddressResponse>(defaultCoveredValue);
  const [loading, setLoading] = useState<boolean>(false);

  const getCoveredAddress = useCallback(async (token: string) => {
    setLoading(true);
    try {
      await fetcher(API, {
        method: 'GET',
        token,
      })
        .then((response: CoveredAddressResponse) => {
          setDataCoveredAddress(response);
          setLoading(false);
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
    getCoveredAddress,
    dataCoveredAddress,
    loading,
  };
};

export default useCoveredAddress;
