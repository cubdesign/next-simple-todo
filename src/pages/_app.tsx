import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import AuthUserProvider from "@/lib/AuthUser";
import "../firebaseConfig";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthUserProvider>
  );
}

export default MyApp;
