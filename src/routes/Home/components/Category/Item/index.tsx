import React from 'react';
import Typography from '@mui/material/Typography';
import { styItem, styCoverImg } from './styles';

interface Props {
  title?: string;
  image?: any;
  onClick?: React.MouseEventHandler;
}

function ItemCategory({ title, image, onClick }: Props) {
  // console.log("image======>",image)
  return (
    <div className={styItem} onClick={onClick}>
      <div className="cover">
        <div className={styCoverImg}>
          <img src={image === undefined || image === null ? '' : image['url']} width='24px' height='24px'/>
        </div>
        <Typography fontSize="12px">{title}</Typography>
      </div>
    </div>
  );
}

export default ItemCategory;
