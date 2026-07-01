import {
  Heading,
  SimpleGrid,
  Spinner,
  Center,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import socket from "../services/socket";

import DashboardLayout from "../layouts/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import ThreatChart from "../components/dashboard/ThreatChart";
import TimelineChart from "../components/dashboard/TimelineChart";
import TopIPs from "../components/dashboard/TopIPs";
import RecentThreatsTable from "../components/dashboard/RecentThreatsTable";
import AttackOriginCard from "../components/dashboard/AttackOriginCard";
import ThreatWorldMap from "../components/dashboard/ThreatWorldMap";

import {
  getSummary,
  getThreatDistribution,
  getTimeline,
  getTopIPs,
  getRecentThreats,
  getAttackOrigins,
} from "../services/dashboardService";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [distribution, setDistribution] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [topIPs, setTopIPs] = useState([]);
  const [recentThreats, setRecentThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attackOrigins, setAttackOrigins] = useState([]);

  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    fetchSummary();

    socket.on("dashboardUpdated", () => {
      console.log("📊 Dashboard refreshing...");
      fetchSummary();
    });

    return () => {
      socket.off("dashboardUpdated");
    };
  }, []);

  const fetchSummary = async () => {
    try {
      const summaryData = await getSummary();
      setSummary(summaryData.summary);

      const distributionData = await getThreatDistribution();
      setDistribution(distributionData.distribution);

      const timelineData = await getTimeline();
      setTimeline(timelineData.timeline);

      const ipData = await getTopIPs();
      setTopIPs(ipData.topIPs);

      const recentData = await getRecentThreats();
      setRecentThreats(recentData.recentThreats);

      const originData = await getAttackOrigins();
      setAttackOrigins(originData.origins);

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
      <Heading mb={8} color={headingColor}>Dashboard</Heading>

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

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mt={8}>
        <ThreatChart distribution={distribution} />
        <TimelineChart timeline={timeline} />
        <Box mt={8}>
          <TopIPs topIPs={topIPs} />
        </Box>
        <Box mt={8}>
          <RecentThreatsTable threats={recentThreats} />
        </Box>
        <SimpleGrid columns={{ base:1, lg:2 }} spacing={6} mt={8}>
          <AttackOriginCard origins={attackOrigins} />
          <ThreatWorldMap origins={attackOrigins}/>
        </SimpleGrid>
      </SimpleGrid>
    </DashboardLayout>
  );
}

export default Dashboard;