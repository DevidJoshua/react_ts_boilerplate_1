import { css } from 'emotion';

export const styContainer = css`
  margin: 12px 0 48px;

  .slick-slide {
    width: 318px;
    padding: 0 4px;
  }

  .slick-slide img {
    height: 100%;
    width: 100%;
    border-radius: 8px;
  }

  .slick-dots {
    li {
      button {
        width: 10px;
        height: 10px;
        background-color: #efefef;
        border-radius: 50%;

        &:before {
          display: none;
        }
      }

      &.slick-active {
        button {
          width: 15px;
          height: 10px;
          border-radius: 8px;
          background-color: #000000;
        }
      }
    }
  }
`;
