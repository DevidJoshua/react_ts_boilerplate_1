import { css } from 'emotion';
import BgBlue from '@/assets/bg-countdown.png';

export const styBoxShare = css`
  background: url(${BgBlue}) no-repeat top center;
  background-size: 100% 100%;
  padding: 32px 16px;
  min-height: 254px;
`;

export const styBoxContent = css`
  background-color: #f5faff;
  border-radius: 8px;
`;

export const styBoxProgress = css`
  background-color: #f5faff;
  border-radius: 8px;
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

export const styTextLink = css`
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
`;

export const styCoverImg = css`
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  img {
    width: 100%;
  }
`;
