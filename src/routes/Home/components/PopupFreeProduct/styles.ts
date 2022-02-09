import { css } from 'emotion';

export const styBoxmodal = css`
  background-color: #ffffff;
  border-radius: 4px;
  z-index: 10;
  position: absolute;
  width: calc(100% - 62px);
  padding: 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  max-width: 500px;

  img {
    width: 100%;
    max-width: 250px;
    display: block;
    margin: -180px auto 0;
  }
`;

export const styBoxPurple = css`
  background-color: #bb4ee4;
  border-radius: 8px;
  text-align: center;
  padding: 8px;
  margin: 0 0 28px;
`;
