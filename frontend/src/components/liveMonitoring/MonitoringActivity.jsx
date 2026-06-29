import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

function MonitoringActivity() {
  return (
    <Box
      bg="white"
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={4}>
        Recent Activity
      </Heading>

      <Text color="gray.500">
        No monitoring activity yet.
      </Text>
    </Box>
  );
}

export default MonitoringActivity;