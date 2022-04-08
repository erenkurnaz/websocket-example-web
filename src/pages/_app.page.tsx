import type { AppProps } from 'next/app';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import '../styles/globals.scss';
import { SnackbarProvider } from 'notistack';

export const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
      <SnackbarProvider maxSnack={6}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </Container>
  </ThemeProvider>
);

export default MyApp;
