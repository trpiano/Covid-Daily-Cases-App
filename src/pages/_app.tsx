import type { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material/styles";

import { defaultTheme } from "../styles/customMiuTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
