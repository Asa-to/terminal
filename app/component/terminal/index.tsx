import { Stack } from "@mantine/core";
import type { FC } from "react";
import { useCommand } from "~/hooks/useCommand";

type Props = {
  userName: string;
};

export const Terminal: FC<Props> = (props) => {
  const { userName } = props;
  const { terminalRows } = useCommand(userName);

  return (
    <Stack spacing={0} px={8}>
      {terminalRows.map((item) => {
        return item;
      })}
    </Stack>
  );
};
