import { Text } from "@mantine/core";
import type { ReactNode } from "react";
import { useState } from "react";
import { Row } from "~/component/terminal/Row";

export const useTodo = (
  setContent: (content: ReactNode) => void,
  content: ReactNode[]
) => {
  const [todo, setTodo] = useState<string[]>([]);

  const displayTodo = () => {
    setContent(
      todo.map((item, index) => (
        <Row key={`content ${content.length} todo ${index}`}>
          <Text>
            {index}. {item}
          </Text>
        </Row>
      ))
    );
  };

  const addTodo = (text: string) => {
    setTodo((old) => [...old, text]);
  };

  const removeTodo = (index: number) => {
    if (index < 0 || todo.length <= index) {
      return;
    }

    setTodo((old) => {
      return [...old.slice(0, index), ...old.slice(index + 1)];
    });
  };

  return { todo, setTodo, displayTodo, addTodo, removeTodo };
};
