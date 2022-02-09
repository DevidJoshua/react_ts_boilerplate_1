import { css } from 'emotion';
import ImgBg from '@/assets/bg-tokens.png';

export const styContainer = css`
  background: url(${ImgBg}) no-repeat center -10px;
  background-size: 100% 100%;
  height: 245px;
  position: relative;
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
