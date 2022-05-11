import type { AppProps } from 'next/app';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>LRC Player</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
