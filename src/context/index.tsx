import React from 'react';
import { CookiesProvider } from 'react-cookie';
import UserDataProvider from '@context/userData';
import ToasterProvider from '@context/Toaster';
import ShareProvider from '@context/Share';
import AuthProvider from '@context/Auth';
import { ThemeProvider, createTheme } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: 'Proxima',
      fontSize: 12,
    },
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: '12px',
            borderRadius: '8px',
          },
          determinate: {
            backgroundColor: '#ECEEF1',
          },
          bar: {
            backgroundColor: '#6770E6',
            borderRadius: '8px',
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          anchorOriginBottomCenter: {
            bottom: '20px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          text: {
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 'bold',
          },
          outlined: {
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 'bold',
          },
          contained: {
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 'bold',
          },
          containedPrimary: {
            border: 'thin solid #000000',
          },
          containedSecondary: {
            border: 'thin solid #000000',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
          },
        },
      },
    },
  });

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <AuthProvider>
            <ShareProvider>
              <ToasterProvider>
                <UserDataProvider>{children}</UserDataProvider>
              </ToasterProvider>
            </ShareProvider>
          </AuthProvider>
        </CookiesProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default ContextProvider;
