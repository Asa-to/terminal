import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Prompt } from "~/component/terminal/Prompt";
import { Row } from "~/component/terminal/Row";
import { Text } from "@mantine/core";
import { helpCommand } from "~/commands/help";
import { useTodo } from "../commands/todo";
import { useName } from "~/commands/name";
import { closeBrows } from "~/commands/shutdown";

export const useCommand = (userName: string) => {
  const [commands, setCommands] = useState<string[]>([]);
  const [terminalRows, setTerminalRows] = useState<ReactNode[]>([]);
  const { addTodo, displayTodo, removeTodo } = useTodo(
    (content) => setTerminalRows((old) => [...old, content]),
    terminalRows
  );
  const { name, setName } = useName(userName);
  const [clear, setClear] = useState(false);

  // 最新ではないpromptをreadonlyにする
  const [promptId, setPromptId] = useState(0);
  useEffect(() => {
    document
      .getElementById((promptId - 2).toString())
      ?.setAttribute("readonly", "true");
  }, [promptId]);

  // 初期コンテンツの挿入
  useEffect(() => {
    setTerminalRows([
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
        commands={commands}
        id="0"
      />,
    ]);
    setPromptId(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);

  useEffect(() => {
    const newCommand = commands.at(-1);
    if (newCommand === undefined) {
      return;
    }
    const newContent: ReactNode[] = [];
    // renameコマンド実行時にpromptに新しい名前を反映させるための変数
    let newName = "";
    switch (newCommand?.split(" ")[0]) {
      case "help": {
        helpCommand(
          (v) => newContent.push(v),
          `content ${terminalRows.length + newContent.length}`
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
      case "shutdown": {
        closeBrows();
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
      case "clear": {
        setClear((v) => !v);
        setTerminalRows([]);
        return;
      }
      default: {
        newContent.push(
          <Row key={`content ${terminalRows.length + newContent.length}`}>
            <Text w="100%">zsh: command not found: {commands.at(-1)}</Text>
          </Row>
        );
      }
    }
    setTerminalRows((old) => {
      return [
        ...old,
        ...newContent,
        <Prompt
          userName={newName || name}
          key={`content ${terminalRows.length + newContent.length}`}
          setCommand={(v: string) => setCommands((old) => [...old, v])}
          commands={commands}
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
    terminalRows,
    setTerminalRows,
  };
};
