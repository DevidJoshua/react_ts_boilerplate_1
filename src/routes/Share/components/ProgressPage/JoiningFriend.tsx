import React, { useMemo } from 'react';
import Flex from '@components/Flex';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import ImgProfile from '@/assets/dummy-profile.png';
import ImgEmpty from '@/assets/icon-bored.png';
import { ChallengeStatusResponse } from '@routes/Sharereact/interface';
interface Props {
  dataChallengeStatus?: ChallengeStatusResponse;
}

function JoiningFriend(props: Props) {
  const { dataChallengeStatus } = props;

  const { members = [] } = dataChallengeStatus || {};

  const renderMembers = useMemo(() => {
    if (members?.length > 0) {
      return members?.map((val, key) => (
        <Flex
          key={key}
          alignItems="center"
          padding="0 0 20px"
          margin="0 0 28px"
          style={{ borderBottom: 'thin solid #E7EAEE' }}
        >
          <Avatar src={ImgProfile} />
          <Typography fontSize="16px" fontWeight="bold" style={{ paddingLeft: '20px' }}>
            {val.name}
          </Typography>
        </Flex>
      ));
    }

    return (
      <Flex alignItems="center" justifyContent="center" flexDirection="column" margin="24px 0 0">
        <img src={ImgEmpty} alt="empty" />
        <Typography fontSize="16px" fontWeight="bold" marginTop="12px">
          Belum ada teman yang bergabung
        </Typography>
      </Flex>
    );
  }, [members]);

  return (
    <Flex
      flexDirection="column"
      margin="15px 16px 0"
      padding="24px 0 0"
      style={{ borderTop: 'thin solid #E7EAEE' }}
    >
      <Typography fontSize="16px" fontWeight="bold" style={{ marginBottom: '28px' }}>
        Teman Yang Sudah Bergabung
      </Typography>

      <Flex flexDirection="column">{renderMembers}</Flex>
    </Flex>
  );
}

export default JoiningFriend;
