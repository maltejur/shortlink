import { CssBaseline, GeistProvider } from "@geist-ui/react";
import "styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <Head>
        <title>shortlink</title>
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp;
