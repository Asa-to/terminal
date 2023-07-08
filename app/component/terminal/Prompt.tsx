import type { FC } from "react";
import { Text, TextInput } from "@mantine/core";
import { Row } from "./Row";
import { useForm } from "@mantine/form";

type Props = {
  userName: string;
  setCommand: (command: string) => void;
};

export const Prompt: FC<Props> = (props) => {
  const { userName, setCommand } = props;
  const form = useForm({
    initialValues: {
      command: "",
    },
  });

  return (
    <Row>
      <Text color="green">{userName}@MacBook-Air:</Text>
      <Text color="cyan">&nbsp;~&nbsp;</Text>
      <form
        onSubmit={form.onSubmit((values) => setCommand(values.command))}
        style={{ width: "100%" }}
      >
        <TextInput
          variant="unstyled"
          {...form.getInputProps("command")}
          autoFocus
        />
      </form>
    </Row>
  );
};
