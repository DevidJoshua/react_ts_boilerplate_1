import { css } from 'emotion';

export const styBoxBtn = css`
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
  }
`;

export const styInput = css`
  background-color: transparent;
  width: 40px;
  text-align: center;
`;
