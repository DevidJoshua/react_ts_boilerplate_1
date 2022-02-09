import { css } from 'emotion';

export const styContainer = css`
  width: calc(100% / 2);
  padding: 0 8px;

  &:nth-child(2n + 1) {
    padding-left: 0;
  }

  &:nth-child(2n + 2) {
    padding-right: 0;
  }
`;

export const styContent = css`
  padding: 0 0 10px;
  border-radius: 8px;
  background-color: #f5faff;
  position: relative;
  min-width: 126px;
  min-height: 238px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  flex-direction: column;
  margin-bottom: 16px;

  .cover-img {
    width: 100%;
    height: 160px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    background-color: white;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;

    img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const styBtnWishlist = css`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 6;
`;

export const styContentProduct = css`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .label-point {
    color: #6556d9;
    white-space: nowrap;
    width: 40%;
    line-height: 2.2;
  }
`;

export const styContentPrice = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 4px;

  .content-flex {
    display: flex;
    align-items: center;
    margin-right: 8px;
    margin-top: 4px;
  }

  .icon-cart {
    margin-right: 0;
    margin-left: 0;
  }
`;
