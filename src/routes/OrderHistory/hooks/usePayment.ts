import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { PaymentResponse } from '../interface/payment';

const API = `${API_HOST}ext-services/payment/snap/`;

interface Params {
  token: string;
  orderID: string;
  body: {
    callbacks: {
      finish: string;
    };
  };
}

const usePayment = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onHandlePayment = useCallback(
    async ({ token, orderID, body }: Params, cb: (params: PaymentResponse) => void) => {
      setLoading(true);
      await fetcher(`${API}${orderID}`, {
        method: 'POST',
        token,
        body: JSON.stringify(body),
      })
        .then(result => {
          setLoading(false);
          cb(result);
        })
        .catch(error => {
          setLoading(false);
          console.warn(error);
        });
    },
    [],
  );

  return {
    onHandlePayment,
    loading,
  };
};

export default usePayment;
