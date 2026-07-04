import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

function EmptyState({
  title = "No Data Found",
  description = "There is nothing to display.",
  buttonText,
  onButtonClick,
  icon = SearchIcon,
}) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      p={10}
      rounded="lg"
      shadow="md"
      textAlign="center"
    >
      <VStack spacing={5}>
        <Icon
          as={icon}
          boxSize={12}
          color="gray.400"
        />

        <Heading size="md">
          {title}
        </Heading>

        <Text color="gray.500">
          {description}
        </Text>

        {buttonText && (
          <Button
            colorScheme="blue"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </VStack>
    </Box>
  );
}

export default EmptyState;