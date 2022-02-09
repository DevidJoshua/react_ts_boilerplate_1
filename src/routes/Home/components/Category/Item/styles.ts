import { css } from 'emotion';

export const styItem = css`
  width: calc(100% / 4);
  display: flex;
  justify-content: center;
  margin-bottom: 8px;

  &:nth-child(4n + 1) {
    margin-left: 0;
  }

  .cover {
    text-align: center;
    width: 52px;
  }
`;

export const styCoverImg = css`
  background-color: rgba(174, 207, 240, 0.25);
  padding: 8px;
  border-radius: 6px;
  margin: 0 0 6px;
`;
