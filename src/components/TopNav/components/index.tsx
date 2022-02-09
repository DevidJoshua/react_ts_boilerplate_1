import React, { ChangeEvent, useCallback, useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { cx } from 'emotion';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';

import SearchNotif from './SearchNotif';
import SearchCart from './SearchCart';

import { styContainer, styWrap } from './style';

interface Props {
  onBack?: React.MouseEventHandler;
  title?: string;
  isSearchNotif?: boolean;
  isSearchCart?: boolean;
}

const Container = ({ onBack, title, isSearchNotif, isSearchCart }: Props) => {
  const history = useHistory();

  const {
    location: { search },
  } = history;
  const getExistSearch = queryString.parse(search)?.q || '';

  const [value, setValue] = useState<string>(String(getExistSearch) || '');

  const handleChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        history.push({
          pathname: '/search',
          search: queryString.stringify({
            q: value,
          }),
        });
      }
    },
    [history, value],
  );

  return (
    <div className={cx(styContainer, { withBackLabel: Boolean(onBack && title) })}>
      {onBack && title && (
        <div className={styWrap}>
          {onBack && (
            <div className="btn-back" onClick={onBack}>
              <ArrowBackIcon color="secondary" />
            </div>
          )}
          {Boolean(title) && (
            <Typography className="title" fontWeight="bold" fontSize="16px">
              {title}
            </Typography>
          )}
        </div>
      )}

      {isSearchNotif && (
        <SearchNotif
          onChangeSearch={handleChangeSearch}
          onKeyUp={handleKeyUp}
          valueSearch={value}
        />
      )}
      {isSearchCart && (
        <SearchCart
          onChangeSearch={handleChangeSearch}
          onKeyUp={handleKeyUp}
          valueSearch={value}
          onBack={onBack}
        />
      )}
    </div>
  );
};

export default Container;
