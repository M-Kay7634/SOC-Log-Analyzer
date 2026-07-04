import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Icon,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  CheckCircleIcon,
  WarningIcon,
} from "@chakra-ui/icons";

import { useEffect, useState } from "react";

import { getMonitoringStatus } from "../../services/liveMonitoringService";

import StatusBadge from "../common/StatusBadge";

function MonitoringWidget() {
  const bg = useColorModeValue("white", "gray.800");

  const [monitoring, setMonitoring] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const data = await getMonitoringStatus();
      setMonitoring(data.monitoring);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box bg={bg} p={6} rounded="lg" shadow="md">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Monitoring Status
      </Heading>

      <VStack align="stretch" spacing={4}>

        <HStack justify="space-between">
          <Text>Status</Text>

          <StatusBadge
            value={monitoring.status}
            type="monitoring"
          />
        </HStack>

        <HStack justify="space-between">
          <Text>Source</Text>

          <Text fontWeight="bold">
            {monitoring.source}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text>Lines</Text>

          <Text fontWeight="bold">
            {monitoring.linesProcessed}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text>Threats</Text>

          <Text fontWeight="bold">
            {monitoring.threatsDetected}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text>Last Event</Text>

          <Text fontWeight="bold">
            {monitoring.lastEvent || "--"}
          </Text>
        </HStack>

      </VStack>
    </Box>
  );
}

export default MonitoringWidget;