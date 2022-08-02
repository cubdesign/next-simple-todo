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
import { useRouter } from "next/router";
import { useAuthUserContext } from "@/lib/AuthUser";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";

interface IFromInput {
  email: string;
  "new-password": string;
  "confirm-password": string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("必須です")
    .email("正しいメールアドレスを入力してください"),
  "new-password": yup.string().required("必須です"),
  "confirm-password": yup
    .string()
    .oneOf([yup.ref("new-password"), null], "パスワードが一致しません"),
});

const Register: NextPage = () => {
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
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          data.email.trim(),
          data["new-password"].trim()
        );
      login(userCredential.user, () => {
        router.push("/");
      });
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      }
    }
  };

  if (user) {
    router.push("/");
    return <></>;
  }

  return (
    <div>
      <Heading as="h1">新規登録</Heading>
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

        <FormControl isInvalid={"new-password" in errors}>
          <FormLabel htmlFor="new-password">パスワード</FormLabel>
          <Input
            id="new-password"
            type="password"
            placeholder="パスワード"
            {...register("new-password")}
          />
          <FormErrorMessage>
            {errors["new-password"] && errors["new-password"].message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={"confirm-password" in errors}>
          <FormLabel htmlFor="confirm-password">パスワード（確認用）</FormLabel>
          <Input
            id="confirm-password"
            type="password"
            placeholder="パスワード（確認用）"
            {...register("confirm-password")}
          />
          <FormErrorMessage>
            {errors["confirm-password"] && errors["confirm-password"].message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit" size="sm" variant="solid" colorScheme="teal">
          登録
        </Button>
      </Box>
      <Box>
        <Link href="/login" passHref>
          <Button size="sm" variant="link">
            ログインへ
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Register;
