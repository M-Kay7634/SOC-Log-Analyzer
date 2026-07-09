import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function DashboardLayout({ children }) {
  const cardBg = useColorModeValue(
    "gray.500",
    "gray.800"
  );
  return (
    <Flex h="100vh" bg={cardBg}>
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