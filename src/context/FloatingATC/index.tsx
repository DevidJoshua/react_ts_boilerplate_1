import React, {
  FC,
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import { cx } from 'emotion';
import { useLocation, useHistory } from 'react-router-dom';
import toIDR from '@/helpers/toIDR';
import useGetCart from '@hooks/useGetCart';
import normalizerSummaryCart from '@helpers/normalizerSummaryCart';

import Flex from '@components/Flex';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { styCustomSnackbar, styWrapPrice } from './styles';

interface FloatingContext {
  refetch: () => void;
}

const Loader = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex alignItems="center">
        <ShoppingCartIcon style={{ color: '#4F4F4F' }} />
        <div className={styWrapPrice}>
          <Skeleton variant="text" width={80} height={15} />
          <Skeleton variant="text" width={140} height={15} />
        </div>
      </Flex>
      <Skeleton variant="rectangular" width={87} height={35} />
    </Flex>
  );
};

const FloatingATCContext = createContext<FloatingContext>({
  refetch: () => {},
});

const FloatingATCProvider: FC = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const { loading, dataCart, getCart } = useGetCart(true);

  const isCategoryPage = pathname.substring(0, 9) === '/category';

  const refetch = useCallback(() => {
    getCart();
  }, [getCart]);

  const getSummaryCart = useMemo(() => {
    return normalizerSummaryCart(dataCart);
  }, [dataCart]);

  useEffect(() => {
    if (!loading && dataCart.length) {
      setOpenSnack(true);
    }
  }, [dataCart.length, loading]);

  const state = {
    refetch,
  };

  return (
    <FloatingATCContext.Provider value={state}>
      {children}
      <Snackbar
        open={openSnack}
        className={cx(styCustomSnackbar, { isCategory: isCategoryPage })}
        message={
          <>
            {loading ? (
              <Loader />
            ) : (
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  <ShoppingCartIcon style={{ color: '#4F4F4F' }} />
                  <div className={styWrapPrice}>
                    <Typography className="price-personal" fontSize="10px">
                      {toIDR(getSummaryCart.totalPricePersonal)}
                    </Typography>
                    <Typography fontSize="14px" fontWeight="bold">
                      {toIDR(getSummaryCart.totalPriceGroup)} ({getSummaryCart.totalQty})
                    </Typography>
                  </div>
                </Flex>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => history.push('/checkout')}
                >
                  Lanjutkan
                </Button>
              </Flex>
            )}
          </>
        }
        ContentProps={{
          style: {
            backgroundColor: '#F5F9FD',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </FloatingATCContext.Provider>
  );
};

export const useFloatingATC = () => useContext(FloatingATCContext);

export default FloatingATCProvider;
