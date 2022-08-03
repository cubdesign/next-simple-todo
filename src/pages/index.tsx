import AddTodoForm from "@/components/AddTodoForm";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Todo from "@/components/todo";
import { useAuthUserContext } from "@/lib/AuthUser";
import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type TodoType = {
  id: string;
  text: string;
  done: boolean;
  createdAt: Date;
};

const Todos: NextPage = () => {
  const router = useRouter();
  const { user, logout } = useAuthUserContext();
  const [todos, setTodos] = useState<TodoType[]>([]);

  const auth = getAuth();
  const db = getFirestore();

  const loadTodos = async (): Promise<boolean> => {
    const todos: TodoType[] = [];
    const q = query(
      collection(db, "todos"),
      where("uuid", "==", user!.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        text: doc.data().text,
        done: doc.data().done,
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
      });
    });

    setTodos(todos);
    return true;
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!user) {
    router.push("/login");
    return <></>;
  }

  const addTodo = async (text: string): Promise<boolean> => {
    await addDoc(collection(db, "todos"), {
      uuid: user!.uid,
      text,
      done: false,
      createdAt: serverTimestamp(),
    });
    await loadTodos();
    return true;
  };

  const editTodo = async (id: string, text: string): Promise<boolean> => {
    await updateDoc(doc(db, "todos", id), {
      text,
    });
    await loadTodos();
    return true;
  };
  const markTodo = async (id: string, done: boolean): Promise<boolean> => {
    await updateDoc(doc(db, "todos", id), {
      done,
    });
    await loadTodos();
    return true;
  };
  const removeTodo = async (id: string): Promise<boolean> => {
    await deleteDoc(doc(db, "todos", id));
    await loadTodos();
    return true;
  };
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
        <AddTodoForm addTodo={addTodo} />
        <Stack spacing={2}>
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                editTodo={editTodo}
                markTodo={markTodo}
                removeTodo={removeTodo}
              />
            );
          })}
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
};

export default Todos;
