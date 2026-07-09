import {SimpleGrid, Box,} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import socket from "../services/socket";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from '../components/common/StatCard';
import ThreatChart from "../components/dashboard/ThreatChart";
import TimelineChart from "../components/dashboard/TimelineChart";
import TopIPs from "../components/dashboard/TopIPs";
import RecentThreatsTable from "../components/dashboard/RecentThreatsTable";
import AttackOriginCard from "../components/dashboard/AttackOriginCard";
import ThreatWorldMap from "../components/dashboard/ThreatWorldMap";
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import MonitoringWidget from "../components/dashboard/MonitoringWidget";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SystemHealthWidget from "../components/dashboard/SystemHealthWidget";

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

  useEffect(() => {
    fetchSummary();

    socket.on("dashboardUpdated", () => {
      // console.log("📊 Dashboard refreshing...");
      fetchSummary();
    });

    return () => {
      socket.off("dashboardUpdated");
    };
  }, []);

  const fetchSummary = async () => {
    try {
      const [
        summaryData,
        distributionData,
        timelineData,
        ipData,
        recentData,
        originData,
      ] = await Promise.all([
        getSummary(),
        getThreatDistribution(),
        getTimeline(),
        getTopIPs(),
        getRecentThreats(),
        getAttackOrigins(),
      ]);

      setSummary(summaryData.summary);
      setDistribution(distributionData.distribution);
      setTimeline(timelineData.timeline);
      setTopIPs(ipData.topIPs);
      setRecentThreats(recentData.recentThreats);
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
        <LoadingSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box mx="auto">
        <DashboardHeader />

        <SimpleGrid minChildWidth="250px" spacing={5}>
          <StatCard
            title="Total Logs"
            value={summary.totalLogs}
            borderColor="blue.500"
          />

          <StatCard
            title="Threats"
            value={summary.totalThreats}
            borderColor="orange.500"
          />

          <StatCard
            title="Critical"
            value={summary.criticalThreats}
            borderColor="red.500"
          />

          <StatCard
            title="High"
            value={summary.highThreats}
            borderColor="yellow.500"
          />
        </SimpleGrid>

        <SimpleGrid
          minChildWidth="600px"
          spacing={5}
          mt={8}
        >
          <ThreatChart distribution={distribution} />
          <TimelineChart timeline={timeline} />
        </SimpleGrid>
        <SimpleGrid
          minChildWidth="700px"
          spacing={5}
          mt={6}
        >
          <TopIPs topIPs={topIPs} />

          <RecentThreatsTable
            threats={recentThreats}
          />
        </SimpleGrid>
        <SimpleGrid
          minChildWidth="550px"
          spacing={5}
          mt={6}
        >
          <AttackOriginCard
            origins={attackOrigins}
          />

          <MonitoringWidget />
        </SimpleGrid>
        <SimpleGrid
          minChildWidth="650px"
          spacing={5}
          mt={6}
        >
          <ThreatWorldMap
            origins={attackOrigins}
          />

          <SystemHealthWidget />
        </SimpleGrid>
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;