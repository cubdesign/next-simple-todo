import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAuthUserContext } from "@/lib/AuthUser";
import { Box, Container, Heading } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Todos: NextPage = () => {
  const router = useRouter();
  const { user, logout } = useAuthUserContext();

  const auth = getAuth();
  if (!user) {
    router.push("/login");
    return <></>;
  }

  return (
    <Box>
      <Head>
        <title>TODO</title>
        <meta name="description" content="simple Todo app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container as="main" pt="16">
        <Heading as="h1">TODO</Heading>
      </Container>

      <Footer />
    </Box>
  );
};

export default Todos;
