import GlobalStyle from "../styles/global";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { useEffect } from "react";

import { useRouter } from "next/router";

import * as ga from "../utils";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
