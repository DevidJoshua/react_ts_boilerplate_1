import React, { useEffect } from 'react';

import Typography from '@mui/material/Typography';
import LoaderLoadable from '@/components/LoaderLoadable';
import Flex from '@components/Flex';

import useSearch from '@routes/Search/hooks/useSearch';

import ImgEmpty from '@/assets/empty-state-global.png';

import ProductItem from './ProductItem';
import { styWrapProduct } from './styles';

interface Props {
  valueSearch?: string;
}

function ProductList(props: Props) {
  const { valueSearch = '' } = props;
  const { getSearch, dataSearch, loading } = useSearch();

  useEffect(() => {
    getSearch(valueSearch);
  }, [getSearch, valueSearch]);

  if (loading) {
    return <LoaderLoadable />;
  }

  const renderItemProduct = () => {
    if (dataSearch.length) {
      return dataSearch.map(val => {
        const product = val.product_varian;

        return (
          <ProductItem
            key={val.id}
            saleEventID={val.id}
            productImage={product.varianPic.url}
            productName={product.name}
            productPoint={val.rewardPoint}
            productPrice={val.groupPrice}
            sold={0}
            rating={0}
          />
        );
      });
    }

    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        <img src={ImgEmpty} alt="Empty" />
        <Typography fontSize="16px" fontWeight="bold" marginTop="32px">
          Oops, produk tidak ditemukan.
        </Typography>
        <Typography fontSize="14px" marginTop="12px">
          Silahkan gunakan kata kunci yang lain.
        </Typography>
      </Flex>
    );
  };

  return <div className={styWrapProduct}>{renderItemProduct()}</div>;
}

export default ProductList;
