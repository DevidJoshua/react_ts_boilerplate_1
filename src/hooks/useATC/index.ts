import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { useToaster } from '@/context/Toaster';
import { ATCResponse } from './interface';

const API_ATC = `${API_HOST}user-shopping-carts/createupdateqty`;

interface dataProduct {
  sale_event_detail: number;
  user_profile: number;
  savedPrice: number;
  qty: number;
}

interface Params {
  token: string;
  isShowToaster: boolean;
  dataProduct: dataProduct[];
}

const useATC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { showToaster } = useToaster();

  const onATC = useCallback(
    async ({ token, isShowToaster, dataProduct }: Params) => {
      setLoading(true);
      await fetcher(API_ATC, {
        method: 'POST',
        token,
        body: JSON.stringify({
          products: dataProduct,
        }),
      })
        .then((result: ATCResponse[]) => {
          setLoading(false);
          const isSuccess = result.length > 0;

          if (isSuccess) {
            if (isShowToaster) {
              showToaster({
                text: 'Barang berhasil ditambahkan ke keranjang',
                duration: 2000,
              });
            }
          } else {
            showToaster({
              text: 'Barang gagal ditambahkan ke keranjang',
              isError: true,
              duration: 2000,
            });
          }
        })
        .catch(() => {
          setLoading(false);
          showToaster({
            text: 'Terjadi kesalahan. Silahkan coba beberapa saat lagi',
            isError: true,
            duration: 2000,
          });
        });
    },
    [showToaster],
  );

  return {
    onATC,
    loading,
  };
};

export default useATC;
