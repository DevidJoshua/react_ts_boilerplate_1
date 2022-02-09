import { css } from 'emotion';

export const styContainer = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 500px;
  background-color: #000000;
  height: 60px;
  display: flex;
  align-items: center;
  z-index: 50;

  .content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    width: 100%;

    .btn-bottom-nav {
      width: 24px;
      height: 24px;
    }
  }
`;

export const styGift = css`
  width: 66px;
  height: 63px;
  background-color: #fff;
  border: 8px solid #000;
  position: relative;
  top: -20px;
  border-radius: 50%;

  img {
    width: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
