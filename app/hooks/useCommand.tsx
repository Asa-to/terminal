import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Prompt } from "~/component/terminal/Prompt";
import { Row } from "~/component/terminal/Row";
import { Text } from "@mantine/core";
import { helpCommand } from "~/commands/help";
import { useTodo } from "../commands/todo";
import { useName } from "~/commands/name";

export const useCommand = (userName: string) => {
  const [commands, setCommands] = useState<string[]>([]);
  const [content, setContent] = useState<ReactNode[]>([]);
  const { addTodo, displayTodo, removeTodo } = useTodo(
    (content) => setContent((old) => [...old, content]),
    content
  );
  const { name, setName } = useName(userName);

  const [promptId, setPromptId] = useState(0);
  useEffect(() => {
    document
      .getElementById((promptId - 2).toString())
      ?.setAttribute("readonly", "true");
  }, [promptId]);

  useEffect(() => {
    if (content.length === 0) {
      setContent([
        <Text color="yellow" key="content 0" display="inline">
          Terminal ٩(ˊᗜˋ*)و:&nbsp;
          <Text color="white" display="inline">
            Hey, you found the terminal! Type `help` to get started.
          </Text>
        </Text>,
        <Prompt
          key="content 1"
          userName={name}
          setCommand={(command) => setCommands((old) => [...old, command])}
          id={promptId.toString()}
        />,
      ]);
      setPromptId(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newCommand = commands.at(-1);
    if (newCommand === undefined) {
      return;
    }
    const newContent: ReactNode[] = [];
    let newName = "";
    switch (newCommand?.split(" ")[0]) {
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
      case "rename": {
        newName = newCommand.split(" ")[1];
        if (newName) {
          setName(newName);
        }
        break;
      }
      case "": {
        break;
      }
      default: {
        newContent.push(
          <Row key={`content ${content.length + newContent.length}`}>
            <Text w="100%">zsh: command not found: {commands.at(-1)}</Text>
          </Row>
        );
      }
    }
    setContent((old) => {
      return [
        ...old,
        ...newContent,
        <Prompt
          userName={newName || name}
          key={`content ${content.length + newContent.length}`}
          setCommand={(v: string) => setCommands((old) => [...old, v])}
          id={promptId.toString()}
        />,
      ];
    });
    setPromptId((v) => v + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commands]);

  return {
    commands,
    setCommands,
    content,
    setContent,
  };
};
