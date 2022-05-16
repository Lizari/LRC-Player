import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#000000',
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>LRC Player</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
