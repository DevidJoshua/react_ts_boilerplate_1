import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import lsDelete from '@/helpers/client-storage/localStorageDel';

import { useUserData } from '@/context/userData';
import useGetProfile from '@routes/Profile/hooks/useGetProfile';
import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import BottomNav from '@components/BottomNav';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

import ImgProfile from '@/assets/dummy-profile.png';

import Menu from './Menu';
import Loader from './Loader';

function Container() {
  const history = useHistory();
  const [cookies, , removeCookie] = useCookies();
  const { loading: loadingProfile, dataProfile, getProfile } = useGetProfile();

  const {
    isLoggedIn,
    userInfo: { profileID, token },
  } = useUserData();

  useEffect(() => {
    if (isLoggedIn) {
      getProfile(token, profileID);
    }
  }, [getProfile, isLoggedIn, profileID, token]);

  const getProfileName = useMemo(() => {
    return dataProfile?.fullName || '';
  }, [dataProfile?.fullName]);

  const handleClickLogout = () => {
    if (cookies._SID_react) {
      removeCookie('_SID_react', {
        path: '/',
      });
      lsDelete('gi');
      lsDelete('dfc');
      lsDelete('otp-time-expired');
      lsDelete('otp-time-expired');
      window.location.replace('/');
    }
  };

  return (
    <>
      <TopNav title="Profile" onBack={() => history.push('/')} />
      <div style={{ paddingBottom: '100px' }}>
        {loadingProfile ? (
          <Loader />
        ) : (
          <>
            <Flex
              alignItems="center"
              margin="32px 16px"
              padding="0 0 18px"
              style={{ borderBottom: 'thin solid #EDEDED' }}
            >
              <Avatar src={ImgProfile} />
              <Flex
                width="100%"
                justifyContent="space-between"
                alignItems="center"
                margin="0 0 0 8px"
              >
                <Flex flexDirection="column">
                  <Typography fontSize="16px" fontWeight="bold">
                    {getProfileName}
                  </Typography>
                  {/* <Typography fontSize="14px">Lihat profile kamu</Typography> */}
                </Flex>
              </Flex>
            </Flex>

            <Menu />

            <Flex alignItems="center" justifyContent="center" margin="100px 0 20px">
              <Flex onClick={handleClickLogout}>
                <MeetingRoomOutlinedIcon
                  style={{ color: 'rgba(0, 0, 0, 0.5)', marginRight: '8px' }}
                />
                <Typography
                  fontSize="16px"
                  fontWeight="bold"
                  style={{ color: 'rgba(0, 0, 0, 0.5)' }}
                >
                  Keluar Akun
                </Typography>
              </Flex>
            </Flex>
          </>
        )}

        <BottomNav />
      </div>
    </>
  );
}

export default Container;
