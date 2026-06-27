import { useEffect, useState } from "react";
import { Heading, SimpleGrid, Spinner, Center } from "@chakra-ui/react";

import DashboardLayout from "../layouts/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";

import { getSummary } from "../services/dashboardService";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getSummary();
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Center h="300px">
          <Spinner size="xl" />
        </Center>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Heading mb={8} color="gray.700">Dashboard</Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <SummaryCard
          title="Total Logs"
          value={summary.totalLogs}
          color="blue.500"
        />

        <SummaryCard
          title="Threats"
          value={summary.totalThreats}
          color="orange.500"
        />

        <SummaryCard
          title="Critical"
          value={summary.criticalThreats}
          color="red.500"
        />

        <SummaryCard
          title="High"
          value={summary.highThreats}
          color="yellow.500"
        />
      </SimpleGrid>
    </DashboardLayout>
  );
}

export default Dashboard;