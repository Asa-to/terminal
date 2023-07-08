import { Row } from "~/component/terminal/Row";
import { Text } from "@mantine/core";

export const helpCommand = (
  setContent: (ReactNode: any) => void,
  nextKey: string
) => {
  setContent(
    <Row key={nextKey}>
      <Text>ヘルプだよ〜ん</Text>
    </Row>
  );
};
