import { memo, useMemo } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import StatCard from "../common/StatCard";

function ThreatStats({ threats }) {
  const stats = useMemo(() => {
    return {
      total: threats.length,

      critical: threats.filter(
        (t) => t.priority === "Critical"
      ).length,

      high: threats.filter(
        (t) => t.priority === "High"
      ).length,

      mediumLow: threats.filter(
        (t) =>
          t.priority === "Medium" ||
          t.priority === "Low"
      ).length,
    };
  }, [threats]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      spacing={5}
      mb={6}
    >
      <StatCard
        title="Total Threats"
        value={stats.total}
        borderColor="blue.500"
      />

      <StatCard
        title="Critical"
        value={stats.critical}
        borderColor="red.500"
      />

      <StatCard
        title="High Priority"
        value={stats.high}
        borderColor="orange.500"
      />

      <StatCard
        title="Medium & Low"
        value={stats.mediumLow}
        borderColor="green.500"
      />
    </SimpleGrid>
  );
}

export default memo(ThreatStats);