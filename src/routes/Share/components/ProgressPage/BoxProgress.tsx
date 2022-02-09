import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ChallengeStatusResponse } from '@routes/Sharereact/interface';

import Flex from '@components/Flex';
import BottomSheet from '@/components/BottomSheet';
import Timer from '@/components/Timer';
import Header from '@/components/BottomSheet/Header';

import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';

import ImgGift from '@/assets/gift.png';
import ImgAbout1 from '@/assets/about-gift/1.png';
import ImgAbout2 from '@/assets/about-gift/2.png';
import ImgAbout3 from '@/assets/about-gift/3.png';
import { styBoxProgress } from '../styles';

dayjs.extend(utc);

interface Props {
  dataChallengeStatus?: ChallengeStatusResponse;
}

function BoxProgress(props: Props) {
  const { dataChallengeStatus } = props;

  const [showHelp, setShowHelp] = useState<boolean>(false);

  const { userChallengeDetails } = dataChallengeStatus || {};
  const getValueMaxShare = userChallengeDetails?.maxValue || 0;
  const getActualValue = userChallengeDetails?.actualValue || 0;

  const normalise = (value: number) => ((value - 0) * 100) / (getValueMaxShare - 0);

  const timeExpired = useMemo(() => {
    const formatted = dayjs(userChallengeDetails?.expiredTime).utc().format('DD MMM YYYY HH:mm:ss');
    const parseDate = dayjs(formatted).valueOf();
    return parseDate;
  }, [userChallengeDetails?.expiredTime]);

  return (
    <>
      <Flex
        className={styBoxProgress}
        flexDirection="column"
        padding="16px 16px"
        margin="-30px 16px 0"
      >
        <Flex alignItems="center" width="100%">
          <img src={ImgGift} alt="gift" />
          <Flex
            alignItems="center"
            width="100%"
            justifyContent="space-between"
            padding="0 0 0 12px"
          >
            <Typography fontSize="14px" fontWeight="bold">
              Bagikan kepada {getValueMaxShare} orang terdekat!
            </Typography>
            <div onClick={() => setShowHelp(true)}>
              <HelpIcon style={{ color: '#99A3AD' }} />
            </div>
          </Flex>
        </Flex>

        <Flex width="100%" flexDirection="column" margin="10px 0 6px">
          <LinearProgress
            style={{ width: '100%' }}
            variant="determinate"
            value={normalise(getActualValue)}
          />

          <Flex alignItems="center" justifyContent="space-between" margin="12px 0 0">
            <Flex alignItems="center">
              <Typography style={{ color: '#555857' }} fontSize="12px" marginRight="12px">
                Waktunya cuma:
              </Typography>
              <Timer date={timeExpired} variant="smallSliceGrey" />
            </Flex>
            <Flex>
              <Typography fontSize="16px" fontWeight="bold" style={{ color: '#6770E6' }}>
                {getActualValue}/<span style={{ color: '#DFE1E3' }}>{getValueMaxShare}</span>
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <BottomSheet open={showHelp} header={false} onDismiss={() => setShowHelp(false)}>
        <Header title="Tentang Hadiah" onClose={() => setShowHelp(false)} />

        <Flex margin="0 16px" flexDirection="column">
          <Flex margin="0 0 32px">
            <div style={{ minWidth: '105px' }}>
              <img src={ImgAbout1} width="98px" />
            </div>
            <Flex padding="0 0 0 18px" flexDirection="column">
              <Typography fontSize="16px" fontWeight="bold">
                Daftarkan dirimu
              </Typography>
              <Typography fontSize="14px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor morbi sed et nunc.
              </Typography>
            </Flex>
          </Flex>
          <Flex margin="0 0 32px">
            <div style={{ minWidth: '105px' }}>
              <img src={ImgAbout2} width="105px" />
            </div>
            <Flex padding="0 0 0 18px" flexDirection="column">
              <Typography fontSize="16px" fontWeight="bold">
                Bagikan Link
              </Typography>
              <Typography fontSize="14px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor morbi sed et nunc.
              </Typography>
            </Flex>
          </Flex>
          <Flex margin="0 0 32px">
            <div style={{ minWidth: '105px' }}>
              <img src={ImgAbout3} width="73px" />
            </div>
            <Flex padding="0 0 0 18px" flexDirection="column">
              <Typography fontSize="16px" fontWeight="bold">
                Pastikan temanmu ikut daftar
              </Typography>
              <Typography fontSize="14px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor morbi sed et nunc.
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </BottomSheet>
    </>
  );
}

export default BoxProgress;
