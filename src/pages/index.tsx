import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TODO</title>
        <meta name="description" content="simple Todo app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading as="h1">TODO</Heading>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
