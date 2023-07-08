import { Box } from "@mantine/core";
import { Outlet } from "@remix-run/react";
import type { FC } from "react";

const Layout: FC = () => {
  return (
    <Box w="100vw" h="100vh" bg="dark">
      <Outlet />
    </Box>
  );
};

export default Layout;
