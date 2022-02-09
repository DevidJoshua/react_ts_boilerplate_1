import React from 'react';
import { useHistory } from 'react-router-dom';

import toIDR from '@/helpers/toIDR';
import Flex from '@components/Flex';
import Typography from '@mui/material/Typography';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconToken from '@/assets/icon-token.png';

interface Props {
  rewardToken?: number;
}

function Points(props: Props) {
  const { rewardToken = 0 } = props;
  const history = useHistory();

  return (
    <Flex
      onClick={() => history.push('/tokens')}
      width="90%"
      alignItems="center"
      justifyContent="center"
      padding="6px 0"
      margin="-25px auto 0"
      style={{
        backgroundColor: '#F6F8F9',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      <Flex
        padding="7px 10px"
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: '#EAEEF3', borderRadius: '8px' }}
      >
        <img src={IconToken} width="24px" />
        <Typography fontSize="16px" fontWeight="bold" style={{ color: '#6556D9' }}>
          {toIDR(rewardToken, false)} Token
        </Typography>
      </Flex>
      <ChevronRightIcon
        style={{
          position: 'absolute',
          right: '20px',
        }}
      />
    </Flex>
  );
}

export default Points;
