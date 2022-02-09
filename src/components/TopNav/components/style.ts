import { css } from 'emotion';

export const styContainer = css`
  background-color: #000;
  padding: 16px;
  z-index: 10;
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  &.withBackLabel {
    padding: 36px 16px 16px;
  }
`;

export const styWrap = css`
  position: relative;

  .btn-back {
    top: 50%;
    left: 0;
    position: absolute;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
  }

  .title {
    color: #fdfdfd;
    text-align: center;
  }
`;

export const styWrapSearch = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .btn-notif {
    margin-left: 12px;
    width: 24px;
    height: 24px;
  }
`;

export const styWrapSearchCart = css`
  display: flex;
  align-items: center;

  .btn-back {
    margin-right: 12px;
  }

  .btn-cart {
    margin-left: 12px;
  }

  .btn-back,
  .btn-cart {
    width: 24px;
    height: 24px;
  }
`;
