import {
  Box,
  Button,
  HStack,
} from "@chakra-ui/react";

function MonitoringControls({
  handleStart,
  handleStop,
}) {
  return (
    <Box mb={6}>
      <HStack spacing={4}>
        <Button
          colorScheme="green"
          onClick={handleStart}
        >
          Start Monitoring
        </Button>

        <Button
          colorScheme="red"
          onClick={handleStop}
        >
          Stop Monitoring
        </Button>
      </HStack>
    </Box>
  );
}

export default MonitoringControls;