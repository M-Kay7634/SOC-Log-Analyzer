import {
  Box,
  Divider,
  Heading,
  HStack,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

function AppearanceCard() {
  const { colorMode, toggleColorMode } =
    useColorMode();
    const cardBg = useColorModeValue(
    "white",
    "gray.800"
    );

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        🎨 Appearance
      </Heading>

      <Divider mb={5} />

      <HStack justify="space-between">
        <Text>
          {colorMode === "dark"
            ? "Dark Mode"
            : "Light Mode"}
        </Text>

        <Switch
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
          colorScheme="blue"
        />
      </HStack>
    </Box>
  );
}

export default AppearanceCard;
