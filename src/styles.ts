import { injectGlobal } from 'emotion';
import fontNormal from '@/assets/fonts/Proxima-Regular.otf';
import fontBold from '@/assets/fonts/Proxima-Bold.otf';
import fontMedium from '@/assets/fonts/Proxima-Medium.otf';

injectGlobal`
  @font-face {
    font-family: Proxima;
    font-weight: normal;
    src: url(${fontNormal});
  }
  @font-face {
    font-family: Proxima;
    font-weight: bold;
    src: url(${fontBold});
  }
  @font-face {
    font-family: Proxima;
    font-weight: 400;
    src: url(${fontMedium});
  }

  :focus-visible {
    outline: none;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Proxima;
  }

  input {
    font-family: Proxima;
    border: none;

    &:focus-visible {
      outline: none;
    }
  }
`;
