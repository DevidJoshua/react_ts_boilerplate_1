import { css } from 'emotion';

export const styContainer = css`
  padding: 16px;
  margin: 16px 0;
`;

export const styContent = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 12px;

  .shipping-info {
    display: flex;
    align-items: center;

    img {
      margin-right: 8px;
    }
  }

  .shipping-price {
    display: flex;
    align-items: center;
  }
`;

export const styItemShipping = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 12px;

  .info {
    display: flex;
    align-items: center;

    img {
      margin-right: 8px;
    }
  }
`;

export const styWrapListShipping = css`
  padding: 0 24px;
`;
