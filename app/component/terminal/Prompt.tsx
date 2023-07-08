import type { FC } from "react";
import { useRef, useState, useEffect } from "react";
import { Text, TextInput } from "@mantine/core";
import { Row } from "./Row";
import { useForm } from "@mantine/form";

type Props = {
  userName: string;
  setCommand: (command: string) => void;
  commands: string[];
  id: string;
};

export const Prompt: FC<Props> = (props) => {
  const { userName, setCommand, id, commands } = props;
  const form = useForm({
    initialValues: {
      command: "",
    },
  });
  const [input, setInput] = useState("");

  let curIndex = useRef(0);
  useEffect(() => {
    curIndex.current = commands.length;
  }, [commands.length]);

  return (
    <Row>
      <Text color="green">{userName}@MacBook-Air:</Text>
      <Text color="cyan">&nbsp;~&nbsp;</Text>
      <form
        onSubmit={form.onSubmit(() => setCommand(input))}
        style={{ width: "100%" }}
        autoComplete="off"
      >
        <TextInput
          {...form.getInputProps("command")}
          variant="unstyled"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          autoFocus
          id={id}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              const index = curIndex.current - 1;
              if (index < 0) {
                return;
              }
              const command = commands.at(curIndex.current - 1);
              if (command) {
                setInput(command);
                curIndex.current -= 1;
              }
            }
            if (e.key === "ArrowDown") {
              const index = curIndex.current + 1;
              if (index === commands.length) {
                setInput("");
                curIndex.current += 1;
              }
              const command = commands.at(index);
              if (command) {
                setInput(command);
                curIndex.current += 1;
              }
            }
          }}
        />
      </form>
    </Row>
  );
};
