import React, { useState } from 'react';
import { API_HOST } from '@config';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { useCookies } from 'react-cookie';
import { useUserData } from '@/context/userData';
import { useToaster } from '@/context/Toaster';

import fetcher from '@/helpers/fetcher';
import Card from '@/components/Card';
import Flex from '@/components/Flex';

import TextField from '@/components/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RegisterResponse } from '../interface';

const API_CREATE_USER = `${API_HOST}auth/local/register`;
const API_REGIS_REFERAL = `${API_HOST}mgmupdate?`;

interface Props {
  refNo?: string | undefined;
}

function Form(props: Props) {
  const { refNo } = props;

  const history = useHistory();
  const [, setCookies] = useCookies(['_SID_react']);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hp, setHp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { showToaster } = useToaster();
  const { setUserData } = useUserData();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleChangeHp = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = String(val.replace(/[^0-9]/gm, ''));
    val = String(val.replace(/^[0,'+']/gm, '62'));
    val = String(val.replace(/^[8]/gm, '628'));
    val = String(val.replace(/^..[0]/gm, '628'));

    if (val.length <= 14) {
      setHp(val);
    }
  };

  const handleClickRegister = async () => {
    const getFirstNull = hp.indexOf('0', 0);
    const checkPhone = getFirstNull === 0;

    if (!name || !email || !username || !password || !hp) {
      showToaster({
        text: 'Silahakan lengkapi form di atas terlebih dahulu',
        isError: true,
        duration: 3000,
      });
    } else if (checkPhone) {
      showToaster({
        text: 'Format nomor HP harus 62xxx. Silahkan periksa kembali',
        isError: true,
        duration: 5000,
      });
    } else {
      setLoading(true);
      // create users
      await fetcher(API_CREATE_USER, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          fullName: name,
          mobileNum: hp,
        }),
      }).then(async (result: RegisterResponse) => {
        const resultToken = result.jwt || '';
        const resultUserInfo = result.user || {};
        const resultUserProfile = resultUserInfo.user_profile || {};
        const userID = resultUserInfo.id;

        if (resultUserInfo.id) {
          setCookies('_SID_react', resultToken, {
            path: '/',
          });

          if (refNo) {
            try {
              await fetcher(
                `${API_REGIS_REFERAL}refNo=${refNo}&userProfileId=${resultUserProfile.id}`,
                {
                  method: 'PUT',
                },
              );
            } catch (error) {
              console.warn(error);
            }
          }

          setUserData({
            token: resultToken,
            userID,
            profileID: resultUserProfile.id,
            moreUserInfo: {
              fullName: resultUserProfile.fullName,
              phoneNumber: resultUserProfile.mobileNum,
              email: resultUserInfo.email,
              username: resultUserInfo.username,
              mobileVerified: resultUserProfile.mobileVerified,
              challengeDetails: [],
              rewardPoint: resultUserProfile.rewardPoint,
            },
          });

          showToaster({
            text: `Selamat ${resultUserProfile.fullName} kamu berhasil terdaftar`,
            isError: false,
            duration: 3000,
          });
          setLoading(false);
          history.push({
            pathname: '/otp',
            search: queryString.stringify({
              ld: '/',
              req: 1,
              phone: hp,
            }),
          });
        } else {
          setLoading(false);
          showToaster({
            text:
              result?.message?.[0]?.messages?.[0]?.message ||
              'Terjadi kesalahan. Silahkan coba lagi',
            isError: true,
            duration: 3000,
          });
        }
      });
    }
  };

  return (
    <>
      <Card margin="24px 16px 0">
        <Typography fontWeight="bold" fontSize="16px">
          Informasi Kamu
        </Typography>

        <Flex flexDirection="column" margin="24px 0 0">
          <TextField
            label="Nama Kamu"
            placeholder="Masukan Nama Lengkap"
            isDark
            isSpaceBottom
            onChange={handleChangeName}
            value={name}
          />
          <TextField
            label="Email"
            placeholder="Masukan Email Kamu"
            isDark
            isSpaceBottom
            onChange={handleChangeEmail}
            value={email}
          />
          <TextField
            label="Username"
            placeholder="Masukan Username Kamu"
            isDark
            isSpaceBottom
            onChange={handleChangeUsername}
            value={username}
          />
          <TextField
            label="Password"
            placeholder="Masukan Password Kamu"
            isDark
            isSpaceBottom
            onChange={handleChangePassword}
            value={password}
            type="password"
          />
          <TextField
            label="Nomor HP"
            placeholder="Contoh: 628123456789"
            isDark
            isSpaceBottom
            onChange={handleChangeHp}
            value={hp}
          />
        </Flex>
      </Card>

      <Flex margin="24px 16px 0" flexDirection="column">
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={loading}
          onClick={handleClickRegister}
        >
          Verifikasi OTP
        </Button>
        <Flex margin="12px 0" width="100%" alignItems="center" justifyContent="center">
          <Typography fontSize="12px">Sudah punya akun ?</Typography>
        </Flex>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          onClick={() => history.push('/login')}
        >
          Login
        </Button>
      </Flex>
    </>
  );
}

export default Form;
