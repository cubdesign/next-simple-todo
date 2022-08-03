import { Box, IconButton, Checkbox, Input, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { TodoType } from "@/pages/index";
import React, { useState } from "react";
export type TodoProps = {
  todo: TodoType;
  editTodo: (id: string, text: string) => Promise<boolean>;
  markTodo: (id: string, done: boolean) => Promise<boolean>;
  removeTodo: (id: string) => Promise<boolean>;
};
const Todo: React.FC<TodoProps> = ({
  todo,
  editTodo,
  markTodo,
  removeTodo,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(todo.text);
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Checkbox
        p={2}
        onChange={() => markTodo(todo.id, !todo.done)}
        isChecked={todo.done}
      />
      <Box
        sx={{
          width: "100%",
        }}
        pr={2}
        onClick={() => setEditing(!editing)}
      >
        {editing ? (
          <Input
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.nativeEvent.isComposing === false && e.key === "Enter") {
                setEditing(false);
                const trimmedText = text.trim();
                if (trimmedText.length === 0 || todo.text === trimmedText) {
                  setText(todo.text);
                  return;
                }
                setText(trimmedText);
                await editTodo(todo.id, trimmedText);
              }
            }}
            onBlur={async (e: React.FocusEvent<HTMLInputElement>) => {
              setEditing(false);
              const trimmedText = text.trim();
              if (trimmedText.length === 0 || todo.text === trimmedText) {
                setText(todo.text);
                return;
              }
              setText(trimmedText);
              await editTodo(todo.id, trimmedText);
            }}
          />
        ) : (
          <Text>{todo.done ? <s>{text}</s> : text}</Text>
        )}
      </Box>

      <IconButton
        aria-label="Remove"
        onClick={() => removeTodo(todo.id)}
        icon={<DeleteIcon />}
      />
    </Box>
  );
};
export default Todo;
