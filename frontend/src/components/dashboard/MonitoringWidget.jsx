import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";

import { useEffect, useState, memo } from "react";

import { getMonitoringStatus } from "../../services/liveMonitoringService";

import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";

function MonitoringWidget() {
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

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

  if (!monitoring) {
    return (
      <Box
        bg={bg}
        p={6}
        rounded="lg"
        shadow="md"
        minH="420px"
      >
        <Heading size="md" mb={5}>
          Monitoring Status
        </Heading>

        <EmptyState
          title="Monitoring Offline"
          description="Monitoring status is currently unavailable."
        />
      </Box>
    );
  }

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      minH="420px"
    >
      <Heading size="md" mb={5}>
        Monitoring Status
      </Heading>

      <VStack align="stretch" spacing={4}>

        <HStack
          justify="space-between"
          p={2}
          rounded="md"
          _hover={{
            bg: hoverBg,
          }}
        >
          <Text>Status</Text>

          <StatusBadge
            value={monitoring.status}
            type="monitoring"
          />
        </HStack>

        <HStack
          justify="space-between"
          p={2}
          rounded="md"
          _hover={{
            bg: hoverBg,
          }}
        >
          <Text>Log Source</Text>

          <Text fontWeight="bold">
            {monitoring.source}
          </Text>
        </HStack>

        <HStack
          justify="space-between"
          p={2}
          rounded="md"
          _hover={{
            bg: hoverBg,
          }}
        >
          <Text>Lines Processed</Text>

          <Text fontWeight="bold">
            {monitoring.linesProcessed}
          </Text>
        </HStack>

        <HStack
          justify="space-between"
          p={2}
          rounded="md"
          _hover={{
            bg: hoverBg,
          }}
        >
          <Text>Threats Detected</Text>

          <Text fontWeight="bold">
            {monitoring.threatsDetected}
          </Text>
        </HStack>

        <HStack
          justify="space-between"
          p={2}
          rounded="md"
          _hover={{
            bg: hoverBg,
          }}
        >
          <Text>Last Event</Text>

          <Text fontWeight="bold">
            {monitoring.lastEvent
              ? new Date(
                  monitoring.lastEvent
                ).toLocaleString()
              : "--"}
          </Text>
        </HStack>

      </VStack>
    </Box>
  );
}

export default memo(MonitoringWidget);