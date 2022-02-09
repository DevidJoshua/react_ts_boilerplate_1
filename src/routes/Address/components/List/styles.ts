import { css } from 'emotion';

export const styItemAddress = css`
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  &.active {
    background-color: rgba(162, 181, 200, 0.08);
  }

  .detail-address {
    max-width: 214px;
    margin-left: 12px;
  }
`;
