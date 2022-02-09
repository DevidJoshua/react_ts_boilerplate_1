import React, { memo, useRef, useEffect } from 'react';
import Countdown, { CountdownProps, CountdownApi, zeroPad } from 'react-countdown';

import Typography from '@mui/material/Typography';
import Flex from '@components/Flex';

import { itemCountdown } from './styles';

interface PropsRender {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface Props {
  date: CountdownProps['date'];
  variant: 'large' | 'smallPurple' | 'smallSliceGrey';
}

function Timer(props: Props) {
  const { date, variant } = props;
  const countRef = useRef<CountdownApi>();

  const setRef = (countDown: Countdown) => {
    if (countDown) {
      countRef.current = countDown.getApi();
    }
  };

  useEffect(() => {
    if (date) {
      countRef.current?.start();
    }
  }, [date]);

  const renderCustomCountdown = ({ hours, minutes, seconds }: PropsRender) => {
    if (variant === 'large') {
      return (
        <Flex alignItems="center" justifyContent="center" margin="12px 0 0">
          <div className={itemCountdown}>
            <Typography fontSize="32px" fontWeight="bold" color="primary">
              {zeroPad(hours)}
            </Typography>
          </div>
          <Typography fontSize="32px" fontWeight="bold" color="primary">
            :
          </Typography>
          <div className={itemCountdown}>
            <Typography fontSize="32px" fontWeight="bold" color="primary">
              {zeroPad(minutes)}
            </Typography>
          </div>
          <Typography fontSize="32px" fontWeight="bold" color="primary">
            :
          </Typography>
          <div className={itemCountdown}>
            <Typography fontSize="32px" fontWeight="bold" color="primary">
              {zeroPad(seconds)}
            </Typography>
          </div>
        </Flex>
      );
    } else if (variant === 'smallPurple') {
      return (
        <Flex
          alignItems="center"
          justifyContent="center"
          style={{
            background: '#6556D9',
            borderRadius: '16px',
            padding: '2px 8px 0',
            minWidth: '68px',
          }}
        >
          <Typography fontSize="10px" color="secondary">
            {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </Typography>
        </Flex>
      );
    } else if (variant === 'smallSliceGrey') {
      return (
        <Flex alignItems="center" justifyContent="center">
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{
              background: '#E4EAF2',
              borderRadius: '4px',
              padding: '2px 8px 0',
              minWidth: '30px',
            }}
          >
            <Typography
              fontSize="12px"
              style={{
                color: '#65686A',
              }}
            >
              {zeroPad(hours)}
            </Typography>
          </Flex>
          <Flex
            margin="0 4px"
            alignItems="center"
            justifyContent="center"
            style={{
              background: '#E4EAF2',
              borderRadius: '4px',
              padding: '2px 8px 0',
              minWidth: '30px',
            }}
          >
            <Typography
              fontSize="12px"
              style={{
                color: '#65686A',
              }}
            >
              {zeroPad(minutes)}
            </Typography>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{
              background: '#E4EAF2',
              borderRadius: '4px',
              padding: '2px 8px 0',
              minWidth: '30px',
            }}
          >
            <Typography
              fontSize="12px"
              style={{
                color: '#65686A',
              }}
            >
              {zeroPad(seconds)}
            </Typography>
          </Flex>
        </Flex>
      );
    }

    return null;
  };

  return (
    <Countdown
      ref={setRef}
      date={date}
      renderer={renderCustomCountdown}
      autoStart={false}
      zeroPadTime={2}
    />
  );
}

export default memo(Timer);
