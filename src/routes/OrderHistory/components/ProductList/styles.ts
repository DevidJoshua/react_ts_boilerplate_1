import { css } from 'emotion';

export const styStatusLabel = css`
  border-radius: 16px;
  background-color: #93ebb7;
  padding: 5px 10px;

  p {
    color: #2f7c31;
    font-weight: bold;
  }
`;

export const styStatusPending = css`
  border-radius: 16px;
  background-color: #f2c94c;
  padding: 5px 20px;
`;

export const styBgLoading = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 10;
  background: white;
  padding: 25px;
  text-align: center;
`;
