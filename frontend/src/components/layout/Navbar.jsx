import {
  Flex,
  Heading,
  Spacer,
  Button,
  Avatar,
  HStack,
  Text,
  useColorModeValue,
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

  const bg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue(
    "blue.800",
    "blue.300"
  );
  const textColor = useColorModeValue(
    "gray.800",
    "white"
  );

  return (
    <Flex
      bg={bg}
      px={8}
      py={4}
      shadow="sm"
      align="center"
    >
      <Heading
        size="lg"
        color={headingColor}
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
          color={textColor}
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