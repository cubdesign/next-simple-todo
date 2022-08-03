import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { async } from "@firebase/util";
interface IFromInput {
  text: string;
}
const schema = yup.object({
  text: yup.string().required("必須です"),
});

export type AddTodoFormProps = {
  addTodo: (text: string) => Promise<boolean>;
};
const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFromInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    try {
      const trimmedText = data.text.trim();
      if (trimmedText.length === 0) return;
      await addTodo(trimmedText);
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      gap={4}
    >
      <FormControl isInvalid={"text" in errors}>
        <Input
          placeholder="Add a todo"
          sx={{
            width: "100%",
          }}
          {...register("text")}
        />
        <FormErrorMessage>
          {errors.text && errors.text.message}
        </FormErrorMessage>
      </FormControl>

      <Button type="submit" size="sm" variant="solid" colorScheme="teal">
        add
      </Button>
    </Box>
  );
};
export default AddTodoForm;
