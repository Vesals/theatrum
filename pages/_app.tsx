import type { AppProps } from 'next/app'
import Head from 'next/head'
import {CssBaseline} from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Head>
          <title>Movie Database</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
        
    </>  
  
  )};

export default MyApp
