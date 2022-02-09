import { css } from 'emotion';

export const styText = css`
  padding: 8px 16px;
  border-radius: 8px;
  color: rgba(122, 134, 147, 0.95);

  &.isLight {
    background-color: #ffffff;
  }

  &.isDark {
    border: thin solid rgba(156, 176, 197, 0.5);
  }
`;
