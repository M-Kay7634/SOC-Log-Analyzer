import { SimpleGrid } from "@chakra-ui/react";
import StatCard from "../common/StatCard";

function ThreatStats({ threats }) {
  const total = threats.length;

  const critical = threats.filter(
    (t) => t.priority === "Critical"
  ).length;

  const high = threats.filter(
    (t) => t.priority === "High"
  ).length;

  const mediumLow = threats.filter(
    (t) =>
      t.priority === "Medium" ||
      t.priority === "Low"
  ).length;

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      spacing={5}
      mb={6}
    >
      <StatCard
        title="Total Threats"
        value={total}
        borderColor="blue.500"
      />

      <StatCard
        title="Critical"
        value={critical}
        borderColor="red.500"
      />

      <StatCard
        title="High"
        value={high}
        borderColor="orange.500"
      />

      <StatCard
        title="Medium / Low"
        value={mediumLow}
        borderColor="green.500"
      />
    </SimpleGrid>
  );
}

export default ThreatStats;