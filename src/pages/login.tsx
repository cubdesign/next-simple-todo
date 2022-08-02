import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthUserContext } from "@/lib/AuthUser";
import { useRouter } from "next/router";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

interface IFromInput {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("必須です")
    .email("正しいメールアドレスを入力してください"),
  password: yup.string().required("必須です"),
});

const Login: NextPage = () => {
  const auth: Auth = getAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFromInput>({
    resolver: yupResolver(schema),
  });
  const { user, login } = useAuthUserContext();
  const router = useRouter();
  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    setServerError(null);
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password.trim()
      );

      login(userCredential.user, () => {
        router.push("/");
      });
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      }
      console.error(error);
    }
  };

  if (user) {
    router.push("/");
    return <></>;
  }

  return (
    <div>
      <Heading as="h1">ログイン</Heading>
      <Box
        as="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "3",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {serverError && (
          <Alert status="error">
            <AlertIcon />
            {serverError}
          </Alert>
        )}
        <FormControl isInvalid={"email" in errors}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="メールアドレス"
            {...register("email")}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={"password" in errors}>
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="パスワード"
            {...register("password")}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" size="sm" variant="solid" colorScheme="teal">
          ログイン
        </Button>
      </Box>
      <Box>
        <Link href="/register" passHref>
          <Button size="sm" variant="link">
            新規登録へ
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Login;
