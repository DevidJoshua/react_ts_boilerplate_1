import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useCategory from '@hooks/useCategory';
import Typography from '@mui/material/Typography';

import Flex from '@components/Flex';
import BottomSheet from '@/components/BottomSheet';
import Header from '@/components/BottomSheet/Header';

import ItemCategory from './Item';
import LoaderCategory from './Loader';
import { styContainer, styWrapItem } from './styles';

function Category() {
  const history = useHistory();
  const [showAllCategory, setShowAllCategory] = useState<boolean>(false);

  const { getCategory, dataCategory, loading } = useCategory();

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  if (loading) {
    return <LoaderCategory />;
  }

  const handleClickCategory = (slug: string) => {
    history.push(`/category/${slug}`);
  };

  const renderCategoryItem = () => {
    const isMoreCategory = dataCategory.length > 7;
    const arrayCategory = isMoreCategory ? dataCategory.slice(0, 7) : dataCategory;

    if (arrayCategory.length > 0) {
      return (
        <>
          {arrayCategory.map((item, slug) => {
            return (
              <ItemCategory
                key={slug}
                title={item.name}
                image={item.categoryIconPic}
                onClick={() => handleClickCategory(item.slug || 0)}
              />
            );
          })}
          {isMoreCategory && (
            <ItemCategory title="Lihat Semua" onClick={() => setShowAllCategory(true)} />
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className={styContainer}>
      <Typography fontWeight="bold" color="primary" fontSize="16px">
        Kategori
      </Typography>

      <div className={styWrapItem}>{renderCategoryItem()}</div>

      <BottomSheet
        open={showAllCategory}
        header={false}
        onDismiss={() => setShowAllCategory(false)}
      >
        <Header title="Semua Kategori" onClose={() => setShowAllCategory(false)} />

        <Flex
          padding="0 0 100px"
          maxHeight="400px"
          style={{ flexFlow: 'wrap', overflowY: 'scroll', 
          
           }}
        >
          {dataCategory.map((item, slug) => (
            <ItemCategory
              key={slug}
              title={item.name}
              image={item.categoryIconPic}
              onClick={() => handleClickCategory(item.slug || 0)}
            />
          ))}
        </Flex>
      </BottomSheet>
    </div>
  );
}

export default Category;
