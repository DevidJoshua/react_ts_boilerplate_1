import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { API_HOST, HOSTNAME } from '@config';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useCookies } from 'react-cookie';

import lsSet from '@/helpers/client-storage/localStorageSet';
import lsGet from '@/helpers/client-storage/localStorageGet';
import lsDelete from '@/helpers/client-storage/localStorageDel';

import { useToaster } from '@/context/Toaster';
import { useUserData } from '@/context/userData';
import fetcher from '@/helpers/fetcher';

import Flex from '@components/Flex';
import TopNav from '@components/TopNav';

import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import Typography from '@mui/material/Typography';

import IconOTP from '@/assets/icon-otp.png';
import { OTPResponse, OTPVerifyResponse } from '../interface';
import { styContainer, styWrapForm, styInputOTP } from './styles';

const OTP_TIMER = 30;
const API_REQ_OTP = `${API_HOST}ext-services/otp`;
const API_OTP_VERIFY = `${API_HOST}ext-services/verify`;

const otpTimerLeft = (otpInput: string) => {
  const cookieOtp: { startTime: string | number } | null = lsGet({ key: otpInput });

  if (!cookieOtp) {
    return OTP_TIMER;
  }

  const startTime = parseInt(String(cookieOtp.startTime), 10);

  if (startTime) {
    const timeLeft = OTP_TIMER - (Math.floor(Date.now() / 1000) - startTime);

    if (timeLeft > 0 && timeLeft < OTP_TIMER) {
      return timeLeft;
    }
  }

  return;
};

function OTP() {
  const history = useHistory();
  const qs = queryString.parse(history.location.search);

  const { showToaster } = useToaster();
  const [, , removeCookie] = useCookies();
  const {
    loading: loadingUserData,
    userInfo: {
      moreUserInfo: { mobileVerified, phoneNumber: dataPhoneNumber },
    },
  } = useUserData();

  const pin1Ref = useRef<HTMLInputElement>(null);
  const pin2Ref = useRef<HTMLInputElement>(null);
  const pin3Ref = useRef<HTMLInputElement>(null);
  const pin4Ref = useRef<HTMLInputElement>(null);
  const pin5Ref = useRef<HTMLInputElement>(null);
  const pin6Ref = useRef<HTMLInputElement>(null);

  const [pin1, setPin1] = useState<string>('');
  const [pin2, setPin2] = useState<string>('');
  const [pin3, setPin3] = useState<string>('');
  const [pin4, setPin4] = useState<string>('');
  const [pin5, setPin5] = useState<string>('');
  const [pin6, setPin6] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [timer, setTimer] = useState<((otpInputParam: number) => number | undefined) | number>(() =>
    otpTimerLeft('otp-time-expired'),
  );

  const getFirstOTP: string | number = useMemo(() => lsGet({ key: 'otp-time-request' }) || 1, []);

  const reduceTimer = useCallback(interval => {
    setTimer((current: number) => {
      if (current <= 0) {
        clearInterval(interval);

        return 0;
      }

      return current - 1;
    });
  }, []);

  const resetTimer = useCallback(() => {
    setTimer(OTP_TIMER);

    const interval = setInterval(() => {
      reduceTimer(interval);
    }, 1000);
  }, [reduceTimer]);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    const handleStartTimer = () => {
      interval = setInterval(() => {
        reduceTimer(interval);
      }, 1000);
    };

    handleStartTimer();

    return () => clearInterval(interval);
  }, [reduceTimer]);

  const setLocalTimer = useCallback(() => {
    const startTime = lsGet({ key: 'otp-time-expired' });

    if (!startTime) {
      const unixDate = Math.floor(Date.now() / 1000);
      const expired = new Date((unixDate + OTP_TIMER) * 1000);

      const otpObjTimer = {
        startTime: unixDate,
      };

      lsSet({ key: 'otp-time-expired', expiredAt: expired, value: otpObjTimer });
    }
  }, []);

  useEffect(() => {
    lsSet({ key: 'otp-time-request', value: Number(getFirstOTP) + 1 });
  }, [getFirstOTP]);

  useEffect(() => {
    setLocalTimer();
  }, [setLocalTimer]);

  const phoneNumber = useMemo(() => {
    if (!loadingUserData) {
      return qs?.phone || dataPhoneNumber;
    }

    return '';
  }, [dataPhoneNumber, loadingUserData, qs?.phone]);

  const convertPhoneNumber = useMemo(() => {
    let replaceNumber = phoneNumber;
    const firstNumber = phoneNumber?.indexOf('0', 0);

    if (firstNumber === 0) {
      replaceNumber = `62${String(phoneNumber)?.substr(1)}`;
    }

    return replaceNumber;
  }, [phoneNumber]);

  const handleClickBack = () => {
    removeCookie('_SID_react', {
      path: '/',
    });
    lsDelete('otp-time-request');
    lsDelete('otp-time-expired');
    window.location.replace('/');
  };

  const handleRequestOTP = useCallback(async () => {
    await fetcher(API_REQ_OTP, {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: convertPhoneNumber,
        channel: 'sms',
      }),
    })
      .then((response: OTPResponse) => {
        const isSuccess = response.status && response.url;

        if (isSuccess) {
          showToaster({
            text: 'OTP telah dikirimkan',
            isError: false,
            duration: 2500,
          });
          resetTimer();
          setLocalTimer();
        } else {
          showToaster({
            text: response.message || 'Request OTP gagal. Silahkan coba lagi',
            isError: true,
            duration: 2500,
          });
        }
      })
      .catch(error => {
        console.warn(error);
        showToaster({
          text: 'Terjadi kesalahan. Silahkan coba lagi',
          isError: true,
          duration: 2500,
        });
      });
  }, [convertPhoneNumber, resetTimer, setLocalTimer, showToaster]);

  useEffect(() => {
    if (!loadingUserData && Boolean(phoneNumber)) {
      if (qs?.req === '1' && qs?.ld && Number(getFirstOTP) === 1) {
        handleRequestOTP();
      }
    }
  }, [getFirstOTP, handleRequestOTP, history, loadingUserData, phoneNumber, qs?.ld, qs?.req]);

  useEffect(() => {
    if (mobileVerified && !loadingUserData) {
      history.replace('/');
    }
  }, [history, loadingUserData, mobileVerified]);

  const handleClickVerifyOTP = useCallback(async () => {
    if (!pin1 || !pin2 || !pin3 || !pin4 || !pin5 || !pin6) {
      showToaster({
        text: 'Lengkapi OTP terlebih dahulu',
        isError: true,
      });
    } else {
      setLoading(true);
      await fetcher(API_OTP_VERIFY, {
        method: 'POST',
        body: JSON.stringify({
          phoneNumber: convertPhoneNumber,
          code: Number(`${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`),
        }),
      })
        .then((response: OTPVerifyResponse) => {
          const isSuccess = response.message;

          if (isSuccess === 'Verify Number Success') {
            lsDelete('otp-time-request');
            lsDelete('otp-time-expired');
            window.location.href = HOSTNAME || '';
          } else {
            showToaster({
              text: response.message,
              isError: true,
              duration: 2500,
            });
          }
          setLoading(false);
        })
        .catch(error => {
          console.warn(error);
          setLoading(false);
          showToaster({
            text: 'Terjadi kesalahan. Silahkan coba lagi',
            isError: true,
            duration: 2500,
          });
        });
    }
  }, [convertPhoneNumber, pin1, pin2, pin3, pin4, pin5, pin6, showToaster]);

  const renderTimer = useMemo(() => {
    if (timer) {
      return (
        <Flex>
          <Typography fontSize="12px" color="secondary">
            Mohon tunggu dalam {timer} detik untuk kirim ulang
          </Typography>
        </Flex>
      );
    }

    return (
      <Flex onClick={handleRequestOTP} alignItems="center" justifyContent="center">
        <ReplayIcon
          color="secondary"
          style={{ width: '16px', height: '16px', marginRight: '4px' }}
        />
        <Typography fontWeight="bold" fontSize="14px" color="secondary">
          Kirim ulang OTP
        </Typography>
      </Flex>
    );
  }, [handleRequestOTP, timer]);

  return (
    <>
      <TopNav title="OTP" onBack={handleClickBack} />

      <div className={styContainer}>
        <img src={IconOTP} />

        <div className={styWrapForm}>
          <Typography fontSize="14px" color="secondary" align="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae, non ornare lectus
            pharetra. Aliquam viverra in
          </Typography>

          <Flex margin="32px 0 0" alignItems="center" justifyContent="space-between">
            <input
              ref={pin1Ref}
              className={styInputOTP}
              maxLength={1}
              placeholder="-"
              value={pin1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                value = String(value.replace(/[^0-9]/gm, ''));

                setPin1(value);
                if (value) {
                  pin2Ref.current?.focus();
                }
              }}
            />
            <input
              ref={pin2Ref}
              className={styInputOTP}
              maxLength={1}
              placeholder="-"
              value={pin2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                value = String(value.replace(/[^0-9]/gm, ''));

                setPin2(value);
                if (value) {
                  pin3Ref.current?.focus();
                } else {
                  pin1Ref.current?.focus();
                }
              }}
            />
            <input
              ref={pin3Ref}
              className={styInputOTP}
              maxLength={1}
              placeholder="-"
              value={pin3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                value = String(value.replace(/[^0-9]/gm, ''));

                setPin3(value);
                if (value) {
                  pin4Ref.current?.focus();
                } else {
                  pin2Ref.current?.focus();
                }
              }}
            />
            <input
              ref={pin4Ref}
              className={styInputOTP}
              maxLength={1}
              placeholder="-"
              value={pin4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                value = String(value.replace(/[^0-9]/gm, ''));

                setPin4(value);
                if (value) {
                  pin5Ref.current?.focus();
                } else {
                  pin3Ref.current?.focus();
                }
              }}
            />
            <input
              ref={pin5Ref}
              className={styInputOTP}
              maxLength={1}
              placeholder="-"
              value={pin5}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                value = String(value.replace(/[^0-9]/gm, ''));

                setPin5(value);
                if (value) {
                  pin6Ref.current?.focus();
                } else {
                  pin4Ref.current?.focus();
                }
              }}
            />
            <input
              ref={pin6Ref}
              className={styInputOTP}
              maxLength={1}
              placeholder="-"
              value={pin6}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                value = String(value.replace(/[^0-9]/gm, ''));

                setPin6(value);
                if (!value) {
                  pin5Ref.current?.focus();
                }
              }}
            />
          </Flex>

          <Flex alignItems="center" margin="16px 0 32px" justifyContent="flex-end">
            {renderTimer}
          </Flex>

          <Button
            size="large"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={loading}
            onClick={handleClickVerifyOTP}
          >
            Verifikasi
          </Button>
        </div>
      </div>
    </>
  );
}

export default OTP;
