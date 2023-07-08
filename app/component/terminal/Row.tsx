import type { FlexProps } from "@mantine/core";
import { Flex } from "@mantine/core";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & FlexProps;

export const Row: FC<Props> = (props) => {
  const { children } = props;

  return (
    <Flex
      direction="row"
      align="center"
      h="24px"
      w="maxContent"
      sx={{ whiteSpace: "nowrap" }}
    >
      {children}
    </Flex>
  );
};
