import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_HOST, HOSTNAME } from '@config';

import { useToaster } from '@/context/Toaster';
import fetcher from '@helpers/fetcher';
import lsDelete from '@/helpers/client-storage/localStorageDel';
import {
  ParamsCheckout,
  ParamsCheckoutClaimFree,
  CheckoutResponse,
  PaymentResponse,
} from './interface';

const API = `${API_HOST}purchase-order-bs/createv1`;
const API_CLAIM_FREE = `${API_HOST}purchase-order-bs/claim/freeproduct`;
const API_PAYMENT = `${API_HOST}ext-services/payment/snap`;
const API_UPDATE_CHALLENGE = `${API_HOST}mgmdisburse?refNo=`;

const DEFAULT_ERR_MSG = 'Terjadi kesalahan, silahkan coba beberapa saat lagi';

interface Params {
  token: string;
  isBuyGroup: boolean;
  groupID?: string;
  isContinueFromGroup: boolean;
  isCheckoutClaimToken: boolean;
  body: ParamsCheckout;
}

interface ParamsClaimFree {
  token: string;
  body: ParamsCheckoutClaimFree;
  refNo: string;
}

interface ChallengeUpdateResponse {
  result: {
    id: number;
    isDisbursed: boolean;
  };
}

const useCheckout = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenPayment, setTokenPayment] = useState<string>('');
  const [redirectUrl, setRedirectUrl] = useState<string>('');

  const { showToaster } = useToaster();

  const onCheckout = useCallback(
    async (params: Params) => {
      const {
        token,
        isBuyGroup = false,
        isContinueFromGroup = false,
        body,
        groupID = '',
        isCheckoutClaimToken,
      } = params;

      setLoading(true);
      const APICREATEORDER = isContinueFromGroup ? `${API}?group_buyer_id=${groupID}` : API;

      await fetcher(APICREATEORDER, {
        method: 'POST',
        token,
        body: JSON.stringify(body),
      })
        .then(async (response: CheckoutResponse) => {
          const result = response?.createPurchaseOrder?.order_payment || {};
          const isSuccess = result?.transaction_details?.id && result?.item_details?.length > 0;
          const getOrderNumber = response?.createPurchaseOrder?.puchaseOrderNo || '';

          if (isSuccess) {
            if (isCheckoutClaimToken) {
              history.push('/payment-success?claim=true');
            } else {
              await fetcher(API_PAYMENT, {
                method: 'POST',
                token,
                body: JSON.stringify({
                  transaction_details: result.transaction_details,
                  item_details: result.item_details,
                  customer_details: result.customer_details,
                  callbacks: {
                    finish: isBuyGroup
                      ? `${HOSTNAME}waiting?payment=success&order=${getOrderNumber}`
                      : `${HOSTNAME}payment-success?type=1`,
                  },
                }),
              })
                .then((responsePayment: PaymentResponse) => {
                  const isSuccess = responsePayment.redirect_url && responsePayment.token;
                  lsDelete('addr');
                  lsDelete('recipient-name');
                  lsDelete('recipient-phone');
                  lsDelete('dfc');
                  lsDelete('gi');

                  if (isSuccess) {
                    setTokenPayment(responsePayment.token);
                    setRedirectUrl(responsePayment.redirect_url);
                  } else {
                    showToaster({
                      text: DEFAULT_ERR_MSG,
                      isError: true,
                      duration: 2500,
                    });
                  }
                  setLoading(false);
                })
                .catch(() => {
                  showToaster({
                    text: DEFAULT_ERR_MSG,
                    isError: true,
                    duration: 2500,
                  });
                  setLoading(false);
                });
            }
          } else {
            showToaster({
              text: response.message || DEFAULT_ERR_MSG,
              isError: true,
              duration: 2500,
            });
            setLoading(false);
          }
        })
        .catch(error => {
          console.warn(error);
          showToaster({
            text: error || DEFAULT_ERR_MSG,
            isError: true,
            duration: 2500,
          });
          setLoading(false);
        });
    },
    [history, showToaster],
  );

  const onCheckoutClaimFree = useCallback(
    async (params: ParamsClaimFree) => {
      setLoading(true);
      try {
        const { token, body, refNo } = params;

        await fetcher(`${API_UPDATE_CHALLENGE}${refNo}`, {
          method: 'GET',
        }).then(async (rest: ChallengeUpdateResponse) => {
          if (rest.result.id && rest.result.isDisbursed) {
            await fetcher(API_CLAIM_FREE, {
              method: 'POST',
              token,
              body: JSON.stringify(body),
            })
              .then((response: CheckoutResponse) => {
                const isSuccess = response?.createPurchaseOrder?.id || 0;
                if (isSuccess) {
                  lsDelete('addr');
                  lsDelete('recipient-name');
                  lsDelete('recipient-phone');
                  lsDelete('dfc');
                  lsDelete('gi');
                  history.push('/payment-success?claim=true');
                } else {
                  showToaster({
                    text: response?.message || DEFAULT_ERR_MSG,
                    isError: true,
                    duration: 2500,
                  });
                }
                setLoading(false);
              })
              .catch(error => {
                console.warn(error);
                showToaster({
                  text: error || DEFAULT_ERR_MSG,
                  isError: true,
                  duration: 2500,
                });
                setLoading(false);
              });
          } else {
            showToaster({
              text: DEFAULT_ERR_MSG,
              isError: true,
              duration: 2500,
            });
            setLoading(false);
          }
        });
      } catch (error) {
        console.warn(error);
        showToaster({
          text: DEFAULT_ERR_MSG,
          isError: true,
          duration: 2500,
        });
        setLoading(false);
      }
    },
    [history, showToaster],
  );

  return {
    onCheckout,
    onCheckoutClaimFree,
    tokenPayment,
    redirectUrl,
    loading,
  };
};

export default useCheckout;
