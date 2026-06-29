import {
  Box,
  Button,
  Heading,
  HStack,
  Badge,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

function MonitoringControls({
  status,
  onStart,
  onStop,
}) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      mb={6}
    >
      <Heading size="md" mb={5}>
        Monitoring Controls
      </Heading>

      <VStack align="stretch" spacing={5}>
        <HStack spacing={4}>
          <Button
            colorScheme="green"
            flex={1}
            onClick={onStart}
            isDisabled={status === "Active"}
          >
            Start Monitoring
          </Button>

          <Button
            colorScheme="red"
            flex={1}
            onClick={onStop}
            isDisabled={status !== "Active"}
          >
            Stop Monitoring
          </Button>
        </HStack>

        <HStack>
          <Text fontWeight="bold">
            Current Status:
          </Text>

          <Badge
            colorScheme={
              status === "Active"
                ? "green"
                : "red"
            }
            fontSize="0.9em"
            px={2}
            py={1}
          >
            {status}
          </Badge>
        </HStack>
      </VStack>
    </Box>
  );
}

export default MonitoringControls;