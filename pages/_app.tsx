import type { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, Grid, Typography } from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Theatrum</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <TheatersIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="caption" component="div">
            &copy; 2022 Theatrum. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default MyApp;
