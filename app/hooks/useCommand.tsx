import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Prompt } from "~/component/terminal/Prompt";
import { Row } from "~/component/terminal/Row";
import { Text } from "@mantine/core";
import { helpCommand } from "~/commands/help";
import { useTodo } from "./useTodo";

export const useCommand = (userName: string) => {
  const [commands, setCommands] = useState<string[]>([]);
  const [content, setContent] = useState<ReactNode[]>([
    <Text color="yellow" key="content 0" display="inline">
      Terminal ٩(ˊᗜˋ*)و:&nbsp;
      <Text color="white" display="inline">
        Hey, you found the terminal! Type `help` to get started.
      </Text>
    </Text>,
    <Prompt
      userName={userName}
      key="content 1"
      setCommand={(v: string) => setCommands((old) => [...old, v])}
    />,
  ]);
  const { addTodo, displayTodo, removeTodo } = useTodo(
    (content) => setContent((old) => [...old, content]),
    content
  );

  useEffect(() => {
    const newCommand = commands.at(-1);
    if (!newCommand) {
      return;
    }
    const newContent: ReactNode[] = [];
    switch (newCommand.split(" ")[0]) {
      case "help": {
        helpCommand(
          (v) => newContent.push(v),
          `content ${content.length + newContent.length}`
        );
        break;
      }
      case "addTodo": {
        const newTodo = newCommand.split(" ")?.[1];
        if (newTodo) {
          addTodo(newTodo);
        }
        break;
      }
      case "removeTodo": {
        removeTodo(Number(newCommand.split(" ")[1]));
        break;
      }
      case "todoList": {
        displayTodo();
        break;
      }
      default: {
        newContent.push(
          <Row key={`content ${content.length + newContent.length}`}>
            <Text
              w="100%"
              sx={{
                overflowX: "scroll",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              zsh: command not found: {commands.at(-1)}
            </Text>
          </Row>
        );
      }
    }
    setContent((old) => {
      return [
        ...old,
        ...newContent,
        <Prompt
          userName={userName}
          key={`content ${content.length + newContent.length}`}
          setCommand={(v: string) => setCommands((old) => [...old, v])}
        />,
      ];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commands]);

  return {
    commands,
    setCommands,
    content,
    setContent,
  };
};
