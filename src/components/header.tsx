import { useAuthUserContext } from "@/lib/AuthUser";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Auth, getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const Header = () => {
  const auth: Auth = getAuth();
  const router = useRouter();
  const { logout } = useAuthUserContext();
  return (
    <Box
      as="header"
      sx={{
        flexGrow: 1,
      }}
    >
      <Box position="fixed" width="100%" backgroundColor="teal">
        <Flex justifyContent="space-between" p="3">
          <Text color="white" fontSize="xl" fontWeight="bold">
            TODO
          </Text>

          <Button
            size="sm"
            variant="link"
            color="white"
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
        </Flex>
      </Box>
    </Box>
  );
};
export default Header;
