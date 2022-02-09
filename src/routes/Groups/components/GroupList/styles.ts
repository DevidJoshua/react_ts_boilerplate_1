import { css } from 'emotion';

export const styContainer = css`
  padding: 0 16px;
`;

export const styGroupItem = css`
  border-bottom: thin solid #ededed;
  display: flex;
  align-items: center;

  .content {
    width: 100%;
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info-group {
      width: 80%;
    }
  }
`;
