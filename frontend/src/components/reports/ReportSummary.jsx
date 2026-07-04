import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import StatCard from '../common/StatCard';
import { useEffect, useState } from "react";

import { getReportSummary } from "../../services/reportService";

function ReportSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await getReportSummary();
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center h="250px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Report Summary
      </Heading>

      <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={5}
        >
          <StatCard
            title="Total Logs"
            value={summary.totalLogs}
            borderColor="blue.500"
          />

          <StatCard
            title="Threats"
            value={summary.totalThreats}
            borderColor="red.500"
          />

          <StatCard
            title="Critical"
            value={summary.criticalThreats}
            borderColor="red.600"
          />

          <StatCard
            title="High"
            value={summary.highThreats}
            borderColor="orange.500"
          />

          <StatCard
            title="Medium"
            value={summary.mediumThreats}
            borderColor="yellow.500"
          />

          <StatCard
            title="Low"
            value={summary.lowThreats}
            borderColor="green.500"
          />

          <StatCard
            title="Reports Generated"
            value={summary.totalReports}
            borderColor="purple.500"
          />
        </SimpleGrid>
    </Box>
  );
}

export default ReportSummary;