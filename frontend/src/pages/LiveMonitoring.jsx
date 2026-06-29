import {
  Heading,
  useToast,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import MonitoringControls from "../components/liveMonitoring/MonitoringControls";
import MonitoringActivity from "../components/liveMonitoring/MonitoringActivity";
import MonitoringHeader from "../components/liveMonitoring/MonitoringHeader";
import MonitoringStats from "../components/liveMonitoring/MonitoringStats";

import {
  getMonitoringStatus,
  startMonitoring,
  stopMonitoring,
} from "../services/liveMonitoringService";

function LiveMonitoring() {
  const toast = useToast();

  const [monitoring, setMonitoring] =
    useState({
      status: "Stopped",
      source: "Apache",
      logPath: "",
      startedAt: "",
      lastEvent: "",
      linesProcessed: 0,
      threatsDetected: 0,
      eventsPerMinute: 0,
      isMonitoring: false,
    });

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const data =
        await getMonitoringStatus();

      setMonitoring(data.monitoring);

    } catch (error) {
      console.error(error);
    }
  };

  const handleStart = async () => {
    const data =
      await startMonitoring();

    setMonitoring(data.monitoring);

    toast({
      title: data.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleStop = async () => {
    const data =
      await stopMonitoring();

    setMonitoring(data.monitoring);

    toast({
      title: data.message,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <DashboardLayout>

      <Heading mb={6}>
        Live Monitoring
      </Heading>

      <MonitoringHeader
        status={monitoring.status}
        source={monitoring.source}
        logPath={monitoring.logPath}
        startedAt={monitoring.startedAt}
        lastEvent={monitoring.lastEvent}
        />

        <MonitoringStats
        linesProcessed={monitoring.linesProcessed}
        threatsDetected={monitoring.threatsDetected}
        eventsPerMinute={monitoring.eventsPerMinute || 0}
        health={monitoring.isMonitoring ? "Healthy" : "Stopped"}
        />

      <MonitoringControls
        handleStart={handleStart}
        handleStop={handleStop}
      />

      <MonitoringActivity />

    </DashboardLayout>
  );
}

export default LiveMonitoring;