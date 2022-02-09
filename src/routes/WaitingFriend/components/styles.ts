import { css } from 'emotion';
import BgCountDown from '@/assets/bg-countdown.png';

export const styContainer = css`
  position: relative;
  padding: 32px 0 68px;
  margin-bottom: 40px;
  background: url(${BgCountDown}) no-repeat top center;
  background-size: 100% 100%;

  .title {
    text-align: center;
  }
`;
