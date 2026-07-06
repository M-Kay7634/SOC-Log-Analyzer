import {SimpleGrid, useColorModeValue} from "@chakra-ui/react";
import { memo, } from "react";
import StatCard from "../common/StatCard";

function MonitoringStats({
  linesProcessed,
  threatsDetected,
  eventsPerMinute,
  health,
}) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      spacing={5}
      mb={6}
    >
      <StatCard
        title="Lines Processed"
        value={linesProcessed}
        borderColor="blue.500"
      />

      <StatCard
        title="Threats Detected"
        value={threatsDetected}
        borderColor="red.500"
      />

      <StatCard
        title="Events / Minute"
        value={eventsPerMinute}
        borderColor="orange.500"
      />

      <StatCard
        title="System Health"
        value={health}
        borderColor={
          health === "Healthy"
            ? "green.500"
            : "red.500"
        }
      />
    </SimpleGrid>
  );
}

export default memo(MonitoringStats);