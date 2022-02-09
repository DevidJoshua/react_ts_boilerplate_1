import React, { useEffect } from 'react';
import { cx } from 'emotion';
import { useHistory,useParams } from 'react-router-dom';
import useCategory from '@hooks/useSubCategory';
import Typography from '@mui/material/Typography';
import Loader from './Loader';
import { styContainer, styItem } from './styles';

interface Props {
  categoryID?: string;
  
}

function Category({ categoryID }: Props) {
  const history = useHistory();
  const { getCategory, dataCategory, loading } = useCategory();
  const { subCategoryId } = useParams<ParamsProps>()

  useEffect(() => {
    getCategory(categoryID);
  }, [getCategory]);

  const handleClickCategory = (slug: number) => {
    history.push(`/category/${categoryID}/${slug}`);
  };

  if (loading) {
    return <Loader />;
  }

  const renderItemCategory = () => {
    if (dataCategory.length > 0) {
      return dataCategory.map((item, slug) => {
        return (
          <div
            className={cx(styItem, { active: item.slug === subCategoryId })}
            key={slug}
            onClick={() => handleClickCategory(item.slug || 0,)}
          >
            <img src={dataCategory.categoryIconPic == null ? 'https://via.placeholder.com/24' : dataCategory.categoryIconPic} />
            <Typography fontSize="12px">{item.name}</Typography>
          </div>
        );
      });
    }

    return null;
  };

  return <div className={styContainer}>{renderItemCategory()}</div>;
}

export default Category;
