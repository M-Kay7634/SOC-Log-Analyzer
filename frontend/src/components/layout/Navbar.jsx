import {
  Flex,
  Heading,
  Spacer,
  Button,
  Avatar,
  HStack,
  Text,
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
      px={8}
      py={4}
      shadow="sm"
      align="center"
    >
      <Heading
        size="lg"
        color="#1E3A8A"
      >
        SOC Log Analyzer
      </Heading>

      <Spacer />

      <HStack gap={4}>
        <Avatar
          size="sm"
          name={user?.name}
        />

        <Text
          fontWeight="bold"
        >
          {user?.name}
        </Text>

        <Button
          colorScheme="red"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}

export default Navbar;