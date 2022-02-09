import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import useGetCart from '@/hooks/useGetCart';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { styWrapSearchCart } from './style';

interface Props {
  onChangeSearch: ChangeEventHandler<HTMLInputElement>;
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
  valueSearch?: string;
  onBack?: React.MouseEventHandler;
}

const SearchCart = (props: Props) => {
  const { onBack, onChangeSearch, onKeyUp, valueSearch } = props;
  const history = useHistory();

  const { dataCart } = useGetCart(true);

  const countDataCart = dataCart.length;

  return (
    <div className={styWrapSearchCart}>
      <div className="btn-back" onClick={onBack}>
        <ArrowBackIcon color="secondary" />
      </div>
      <TextField
        placeholder="Eyeliner"
        style={{
          backgroundColor: 'rgba(94, 94, 94, 0.63)',
        }}
        variant="standard"
        fullWidth
        onChange={onChangeSearch}
        onKeyUp={onKeyUp}
        value={valueSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                color="secondary"
                style={{
                  width: '18px',
                  height: '18px',
                }}
              />
            </InputAdornment>
          ),
          style: {
            color: '#ffffff',
            padding: '4px 10px',
          },
        }}
      />

      <div className="btn-cart" onClick={() => history.push('/cart')}>
        <Badge badgeContent={countDataCart} color="error">
          <ShoppingCartIcon color="secondary" />
        </Badge>
      </div>
    </div>
  );
};

export default SearchCart;
