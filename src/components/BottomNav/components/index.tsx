import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@/context/Auth';

import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

import ImgGift from '@/assets/gift.png';
import { styContainer, styGift } from './styles';

function BottomNav() {
  const history = useHistory();

  const { isAuth } = useAuth();

  const getCurrentPath = history.location.pathname;

  const handleClickHome = () => {
    // history.push('/');
    window.location.href = '/'
  };

  const handleClickGroup = () => {
    history.push('/group');
  };

  const handleClickCart = () => {
    history.push('/cart');
  };

  const handleClickProfile = () => {
    history.push('/profile');
  };

  const handleClickShare = () => {
    history.push(isAuth ? '/share-react/progress' : '/shareact/invite?type=fs');
  };

  return (
    <div className={styContainer}>
      <div className="content">
        <div className="btn-bottom-nav" onClick={handleClickHome}>
          <HomeIcon
            style={{
              color: getCurrentPath === '/' ? '#FFFFFF' : '#CECED1',
              width: '24px',
              height: '24px',
            }}
          />
        </div>
        <div className="btn-bottom-nav" onClick={handleClickGroup}>
          <GroupIcon
            style={{
              color: getCurrentPath === '/group' ? '#FFFFFF' : '#CECED1',
              width: '24px',
              height: '24px',
            }}
          />
        </div>
        <div onClick={handleClickShare}>
          <div className={styGift}>
            <img src={ImgGift} alt="gift" />
          </div>
        </div>
        <div className="btn-bottom-nav" onClick={handleClickCart}>
          <ShoppingCartIcon style={{ color: '#CECED1', width: '24px', height: '24px' }} />
        </div>
        <div className="btn-bottom-nav" onClick={handleClickProfile}>
          <PersonIcon
            style={{
              color: getCurrentPath === '/profile' ? '#FFFFFF' : '#CECED1',
              width: '24px',
              height: '24px',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BottomNav;
