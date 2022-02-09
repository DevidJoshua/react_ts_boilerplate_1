import React, { useEffect } from 'react';
import { HOSTNAME } from '@config';
import { useToaster } from '@/context/Toaster';
import useShare from '@routes/Waiting/hooks/useShare';
import copyToClipboard from '@/helpers/copyClipboard';
import Flex from '@components/Flex';
import Modal from '@components/Modal';
import Typography from '@mui/material/Typography';
import LoaderLoadable from '@/components/LoaderLoadable';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styItemShare, styShareText } from './styles';
import facebook from '@/assets/facebook.svg';
import whatsapp from '@/assets/whatsapp.svg';
import twitter from '@/assets/twitter.svg';


interface Props {
  display: boolean;
  token: string;
  groupID: number;
  onClose: () => void;
}

function Share(props: Props) {
  const { display, onClose, token, groupID } = props;
  const { getShare, dataShare, loading } = useShare();
  const { showToaster } = useToaster();
  const images = {
    facebook,
    whatsapp,
    twitter,
  };
  function getImageByKey(key: string) {
    return images[key];
  }

  useEffect(() => {
    if (display) {
      getShare(token, {
        url: `${HOSTNAME}waiting-friend?group=${groupID}`,
      });
    }
  }, [display, getShare, groupID, token]);

  const handleCopy = () => {
    copyToClipboard('urlGroup', `${HOSTNAME}waiting-friend?group=${groupID}`);
    showToaster({
      text: 'Link berhasil disalin',
      isError: false,
      duration: 2000,
    });
  };

  if (loading) {
    return <LoaderLoadable />;
  }

  const renderItemShare = () => {
    return (dataShare || []).map((val, id) => (
      <Flex
        key={id}
        flexDirection="column"
        width="44px"
        height="44px"
        alignItems="center"
        justifyContent="center"
        margin="0 12px"
        onClick={() => window.open(val.link, '_blank')}
      >
        <div className={styItemShare}>
          <img src={getImageByKey(val.media)} width="24px" height="24px" />
        </div>
        <Typography fontSize="11px" fontWeight="bold" align="center" style={{ color: '#718096' }}>
          {val.media}
        </Typography>
      </Flex>
    ));
  };

  return (
    <Modal withBackground open={display} onClose={onClose}>
      <>
        <Typography fontSize="16px" fontWeight="bold" align="center">
          Bagikan Group
        </Typography>

        <Flex alignItems="center" justifyContent="center" margin="32px 0 0">
          {renderItemShare()}
        </Flex>

        <div
          style={{
            margin: '32px 0',
          }}
        >
          <Typography fontSize="11px" fontWeight="bold" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            Link
          </Typography>

          <Flex
            className={styShareText}
            alignItems="center"
            justifyContent="space-between"
            padding="12px 8px"
          >
            <span id="urlGroup">{`${HOSTNAME}waiting-friend?group=${groupID}`}</span>
            <ContentCopyIcon onClick={handleCopy} />
          </Flex>
        </div>
      </>
    </Modal>
  );
}

export default Share;
