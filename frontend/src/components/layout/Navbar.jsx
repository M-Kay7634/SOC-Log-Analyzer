import {
  Box,
  Flex,
  Heading,
  Spacer,
  Text,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex
      bg="white"
      p={4}
      shadow="md"
      align="center"
    >
      <Heading size="md">
        SOC Log Analyzer
      </Heading>

      <Spacer />

      <Text mr={5}>
        {user?.name}
      </Text>

      <Button
        colorScheme="red"
        size="sm"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Flex>
  );
}

export default Navbar;