import { css } from 'emotion';

export const styItemProduct = css`
  display: flex;
  align-items: flex-start;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: thin solid #ededed;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  img {
    width: 92px;
  }
`;

export const styContent = css`
  margin-left: 12px;
  width: 100%;
`;

export const styWrapChip = css`
  margin-top: 12px;
  display: inline-flex;
  flex-wrap: wrap;

  .item-chip {
    margin-right: 6px;
  }
`;

export const styWrapPrice = css`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
