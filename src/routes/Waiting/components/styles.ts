import { css } from 'emotion';
import BgCountDown from '@/assets/bg-countdown.png';

export const styContainer = css`
  padding: 32px 0 18px;
  background: url(${BgCountDown}) no-repeat top center;
  background-size: 100% 100%;

  .title {
    text-align: center;
  }
`;

export const styWaitinInfo = css`
  background-color: rgba(162, 181, 200, 0.35);
  border-radius: 8px;
  padding: 18px;
  text-align: center;
  margin: 12px 16px 12px;
`;

export const styBoxmodal = css`
  background-color: #ffffff;
  border-radius: 4px;
  z-index: 10;
  position: absolute;
  width: calc(100% - 32px);
  padding: 16px;
  top: 20%;
  transform: transalateY(-20%);
  margin: 0 16px;
  max-width: 500px;
`;

export const styItemShare = css`
  background-color: rgba(162, 181, 200, 0.1);
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const styShareText = css`
  background: #edf2f7;
  color: #a0aec0;
  border-radius: 4px;
  margin-top: 4px;
  border: thin solid #cbd5e0;
`;
