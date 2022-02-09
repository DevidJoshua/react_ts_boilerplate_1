import { css } from 'emotion';

export const styCustomSnackbar = css`
  &.MuiSnackbar-anchorOriginBottomCenter {
    bottom: 80px;
    z-index: 3;
  }

  &.isCategory {
    &.MuiSnackbar-anchorOriginBottomCenter {
      bottom: 20px;
    }
  }

  .MuiSnackbarContent-message {
    width: 100%;
  }

  .MuiPaper-root {
    box-shadow: none;
  }
`;

export const styWrapPrice = css`
  margin-left: 12px;

  p {
    color: #000;
  }

  .price-personal {
    color: #828282;
  }
`;
