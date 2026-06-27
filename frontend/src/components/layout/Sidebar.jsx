import {
  Box,
  VStack,
  Button,
  Heading,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      w="250px"
      bg="gray.900"
      color="white"
      p={5}
    >
      <Heading size="md" mb={8}>
        SOC Dashboard
      </Heading>

      <VStack spacing={4} align="stretch">
        <Button as={NavLink} to="/dashboard">
          Dashboard
        </Button>

        <Button as={NavLink} to="/upload">
          Upload Logs
        </Button>

        <Button as={NavLink} to="/threats">
          Threats
        </Button>

        <Button as={NavLink} to="/users">
          Users
        </Button>

        <Button as={NavLink} to="/settings">
          Settings
        </Button>
      </VStack>
    </Box>
  );
}

export default Sidebar;