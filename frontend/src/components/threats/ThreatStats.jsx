import { SimpleGrid } from "@chakra-ui/react";
import SummaryCard from "../dashboard/SummaryCard";

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
      <SummaryCard
        title="Total Threats"
        value={total}
        color="blue.500"
      />

      <SummaryCard
        title="Critical"
        value={critical}
        color="red.500"
      />

      <SummaryCard
        title="High"
        value={high}
        color="orange.500"
      />

      <SummaryCard
        title="Medium / Low"
        value={mediumLow}
        color="green.500"
      />
    </SimpleGrid>
  );
}

export default ThreatStats;