import React, { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import { useHistory, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import queryString from 'query-string';

import fetcher from '@/helpers/fetcher';
import { useUserData } from '@/context/userData';
import { useToaster } from '@/context/Toaster';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import TextField from '@components/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import ImgLogo from '@/assets/logo-react.png';
import { LoginResponse } from '../interface';
import { styContainer, styWrapForm } from './styles';
import { Typography } from '@mui/material';

const API_LOGIN = `${API_HOST}auth/local`;

function Container() {
  const history = useHistory();
  const { search } = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [valueEmail, setValueEmail] = useState<string>('');
  const [valuePassword, setValuePassword] = useState<string>('');
  const [, setCookies] = useCookies(['_SID_react', '_TEMP_SID']);

  const { setUserData } = useUserData();
  const { showToaster } = useToaster();

  const getQs = queryString.parse(search);
  const ld = getQs?.ld || '';

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValueEmail(value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValuePassword(value);
  };

  const handleClickLogin = useCallback(async () => {
    setLoading(true);

    try {
      await fetcher(API_LOGIN, {
        method: 'POST',
        body: JSON.stringify({
          identifier: valueEmail,
          password: valuePassword,
        }),
      }).then((result: LoginResponse) => {
        const userData = result.user || {};
        const profileData = userData.user_profile;
        const isValid = Boolean(userData.id) && Boolean(profileData.mobileVerified);

        if (isValid && result?.statusCode !== 400) {
          setCookies('_SID_react', result.jwt, {
            path: '/',
          });

          setUserData({
            token: result.jwt,
            userID: userData.id,
            profileID: profileData.id,
            moreUserInfo: {
              fullName: profileData.fullName,
              phoneNumber: profileData.mobileNum,
              username: userData.username,
              email: userData.email,
              mobileVerified: profileData.mobileVerified,
              challengeDetails: [],
              rewardPoint: profileData.rewardPoint,
            },
          });

          window.location.replace(String(ld));
        } else {
          if (result?.statusCode === 400) {
            const getMsg = result?.data?.[0]?.messages?.[0]?.message || '';

            showToaster({
              text: getMsg || 'Terjadi kesahalan. Silahkan coba lagi',
              isError: true,
              duration: 3000,
            });
          } else {
            setCookies('_SID_react', result.jwt, {
              path: '/',
            });

            history.push({
              pathname: '/otp',
              search: queryString.stringify({
                ld: '/',
                req: 1,
                ...getQs,
              }),
            });
          }
        }
        setLoading(false);
      });
    } catch (error) {
      showToaster({
        text: 'Terjadi kesahalan. Silahkan coba lagi',
        isError: true,
        duration: 3000,
      });
    }
  }, [getQs, history, ld, setCookies, setUserData, showToaster, valueEmail, valuePassword]);

  return (
    <>
      <TopNav title="Masuk" onBack={() => history.goBack()} />

      <div className={styContainer}>
        <img src={ImgLogo} />

        <div className={styWrapForm}>
          <TextField
            label="Masukan Username/Email"
            placeholder="Masukan Username/Email"
            isLight
            isSpaceBottom
            onChange={handleChangeEmail}
            value={valueEmail}
          />
          <TextField
            label="Password"
            placeholder="Password"
            isLight
            type="password"
            onChange={handleChangePassword}
            value={valuePassword}
          />

          <Flex margin="32px 0 0" flexDirection="column">
            <LoadingButton
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              disabled={loading}
              onClick={handleClickLogin}
            >
              Masuk
            </LoadingButton>

            <Flex margin="12px 0" alignItems="center" justifyContent="center" width="100%">
              <Typography color="secondary">Belum punya akun ?</Typography>
            </Flex>

            <LoadingButton
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => history.push('/register')}
              style={{
                borderColor: 'white',
              }}
            >
              Register
            </LoadingButton>
          </Flex>
        </div>
      </div>
    </>
  );
}

export default Container;
