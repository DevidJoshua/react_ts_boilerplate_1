import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import useGetProductFree from '@/routes/Sharereact/hooks/useGetProductFree';

import Flex from '@components/Flex';
import LoaderLoadable from '@/components/LoaderLoadable';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { styCoverImg } from '../styles';

interface Props {
  refNo: string;
}

function ClaimProduct(props: Props) {
  const { refNo } = props;
  const history = useHistory();
  const { getProductFree, dataProductFree, loading } = useGetProductFree();

  useEffect(() => {
    getProductFree();
  }, [getProductFree]);

  const handleClickClaim = (saleEventID: number) => {
    history.push({
      pathname: '/checkout',
      search: queryString.stringify({
        claim: 'free',
        pid: saleEventID,
        ref: refNo,
      }),
    });
  };

  if (loading) {
    return <LoaderLoadable />;
  }

  return (
    <Flex flexDirection="column" margin="16px 16px 0">
      <Typography fontSize="16px" fontWeight="bold">
        Klaim Hadiah Kamu
      </Typography>

      <Flex margin="32px 0 0" style={{ flexWrap: 'wrap' }}>
        {dataProductFree.map(val => (
          <Flex key={val.id} style={{ width: 'calc(100% / 2)' }}>
            <Flex
              alignItems="center"
              flexDirection="column"
              padding="0"
              margin="0 8px 8px"
              width="100%"
              style={{ backgroundColor: '#F5FAFF', borderRadius: '8px' }}
            >
              <div className={styCoverImg}>
                <img src={val.product_varian.varianPic.url} />
              </div>

              <Flex
                justifyContent="space-between"
                alignItems="center"
                margin="12px 0"
                padding="0 16px"
                width="100%"
              >
                <Typography fontSize="14px">{val.product_varian.name}</Typography>
                <Typography fontWeight="bold" fontSize="14px">
                  Gratis!!!
                </Typography>
              </Flex>

              <Flex padding="0 16px 16px" width="100%">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="small"
                  onClick={() => handleClickClaim(val.id)}
                >
                  Klaim
                </Button>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default ClaimProduct;
