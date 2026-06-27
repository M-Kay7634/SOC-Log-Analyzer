import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function DashboardLayout({ children }) {
  return (
    <Flex h="100vh" bg="gray.100">
      <Sidebar />

      <Box flex="1">
        <Navbar />

        <Box p={6}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}

export default DashboardLayout;