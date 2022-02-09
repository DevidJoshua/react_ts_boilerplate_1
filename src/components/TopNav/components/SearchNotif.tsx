import React, { ChangeEventHandler, KeyboardEventHandler, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { useUserData } from '@/context/userData';
import useNotification from '@/routes/Notification/hooks/useNotification';

import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { styWrapSearch } from './style';

interface Props {
  onChangeSearch: ChangeEventHandler<HTMLInputElement>;
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
  valueSearch?: string;
}

const SearchNotif = (props: Props) => {
  const { onChangeSearch, onKeyUp, valueSearch } = props;
  const history = useHistory();

  const {
    isLoggedIn,
    userInfo: { token, profileID },
  } = useUserData();
  const { getNotification, dataNotification } = useNotification();

  useEffect(() => {
    if (isLoggedIn && profileID) {
      getNotification(token, profileID);
    }
  }, [getNotification, isLoggedIn, profileID, token]);

  const countDataNotif = useMemo(
    () => dataNotification.filter(val => val.isRead === false).length || 0,
    [dataNotification],
  );

  return (
    <div className={styWrapSearch}>
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

      <div className="btn-notif" onClick={() => history.push('/notification')}>
        <Badge badgeContent={countDataNotif} color="error">
          <NotificationsIcon color="secondary" />
        </Badge>
      </div>
    </div>
  );
};

export default SearchNotif;
