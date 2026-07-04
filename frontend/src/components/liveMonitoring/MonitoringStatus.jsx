import {
  Box,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import StatusBadge from '../common/StatusBadge';

function MonitoringStatus({
  status,
  source,
  logPath,
  linesProcessed,
  threatsDetected,
}) {
  return (
    <Box
      bg="white"
      p={6}
      rounded="lg"
      shadow="md"
      mb={6}
    >
      <Heading size="md" mb={4}>
        Monitoring Status
      </Heading>

      <VStack align="start" spacing={3}>
        <Text>
          Status:{" "}
          <StatusBadge
            value={status}
            type="monitoring"
          />
        </Text>

        <Text>
          <b>Source:</b> {source}
        </Text>

        <Text>
          <b>Log File:</b> {logPath || "Not Configured"}
        </Text>

        <Text>
          <b>Lines Processed:</b>{" "}
          {linesProcessed}
        </Text>

        <Text>
          <b>Threats Detected:</b>{" "}
          {threatsDetected}
        </Text>
      </VStack>
    </Box>
  );
}

export default MonitoringStatus;