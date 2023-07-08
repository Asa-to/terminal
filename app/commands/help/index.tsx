import { Text, Box } from "@mantine/core";
import type { FC } from "react";
import { Row } from "~/component/terminal/Row";

export const helpCommand = (
  setContent: (ReactNode: any) => void,
  nextKey: string
) => {
  setContent(
    <Box key={nextKey}>
      <Row>
        <Help command="addTodo XXXX" note="todoにアイテムを追加します" />
      </Row>
      <Row>
        <Help command="removeTodo n" note="todoを削除します" />
      </Row>
      <Row>
        <Help command="todoList" note="todoListを表示します" />
      </Row>
    </Box>
  );
};

type Props = {
  command: string;
  note: string;
};

const Help: FC<Props> = (props) => {
  const { command, note } = props;
  return (
    <Text display="inline" color="red">
      {command}
      <Text display="inline" color="white">
        : {note}
      </Text>
    </Text>
  );
};
