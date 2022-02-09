import { css } from 'emotion';

export const styContainer = css`
  background-color: #f8f9fb;
  max-width: 96px;
  height: 100%;
  padding: 101px 0 150px;
  position: fixed;
  top: 0;
  z-index: 1;
  transform: translateX(0);
  overflow-y: scroll;
`;

export const styItem = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 24px;
  padding: 0 23px;

  &.active {
    p {
      font-weight: bold;
      color: #000000;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  img {
    width: 24px;
    margin: 0 0 16px;
  }

  p {
    color: #828282;
    text-align: center;
    line-height: 15px;
  }
`;

export const activeItem = css`
  p {
    font-weight: bold;
    color: #000000;
  }
`;