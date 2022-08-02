import { useAuthUserContext } from "@/lib/AuthUser";
import { Button, Heading } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { user, logout } = useAuthUserContext();

  const auth = getAuth();
  if (!user) {
    router.push("/login");
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>TODO</title>
        <meta name="description" content="simple Todo app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Button
          onClick={async () => {
            try {
              await auth.signOut();
              logout(() => {
                router.push("/login");
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          ログアウト
        </Button>
      </div>

      <main>
        <Heading as="h1">TODO</Heading>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
