import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

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

      <SimpleGrid columns={2} spacing={5}>

        <Stat>
          <StatLabel>Total Logs</StatLabel>
          <StatNumber>
            {summary.totalLogs}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Threats</StatLabel>
          <StatNumber>
            {summary.totalThreats}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Critical</StatLabel>
          <StatNumber>
            {summary.criticalThreats}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>High</StatLabel>
          <StatNumber>
            {summary.highThreats}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Medium</StatLabel>
          <StatNumber>
            {summary.mediumThreats}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Low</StatLabel>
          <StatNumber>
            {summary.lowThreats}
          </StatNumber>
        </Stat>

      </SimpleGrid>
    </Box>
  );
}

export default ReportSummary;