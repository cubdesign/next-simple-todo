import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AuthUserProvider from "@/lib/AuthUser";
import "../firebaseConfig";

const globalStyles = {
  styles: {
    global: {
      "html, body": {
        bg: "#fafafa",
      },
    },
  },
};

const theme = extendTheme(globalStyles);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthUserProvider>
  );
}

export default MyApp;
