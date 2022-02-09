import { css } from 'emotion';

export const styWrapStep = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const styItemStep = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 69px;
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 30%;
    left: 51px;
    transform: translateY(-30%);
    z-index: 1;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }

  .img {
    width: 32px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-bottom: 8px;
    position: relative;
    z-index: 5;

    &.active {
      background-color: #3eccb2;
    }
  }
`;
