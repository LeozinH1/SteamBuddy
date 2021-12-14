import GlobalStyle from "../styles/global";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { useEffect } from "react";

import { useRouter } from "next/router";

import * as gtag from "../utils";
import Analytics from "../../src/components/Analytics";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <Analytics />
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
