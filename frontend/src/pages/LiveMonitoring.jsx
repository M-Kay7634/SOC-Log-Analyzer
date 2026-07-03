import {
  Heading,
  useToast,
} from "@chakra-ui/react";
import socket from "../services/socket";
import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import MonitoringControls from "../components/liveMonitoring/MonitoringControls";
import MonitoringActivity from "../components/liveMonitoring/MonitoringActivity";
import MonitoringHeader from "../components/liveMonitoring/MonitoringHeader";
import MonitoringStats from "../components/liveMonitoring/MonitoringStats";
import MonitoringConfig from "../components/liveMonitoring/MonitoringConfig";

import {
  getMonitoringStatus,
  saveMonitoringConfig,
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
    socket.on("liveLog", (log) => {
      console.log("Live Log:", log);

      setMonitoring((prev) => ({
        ...prev,
        linesProcessed: prev.linesProcessed + 1,
        threatsDetected:
          prev.threatsDetected + (log.threat ? 1 : 0),
        lastEvent: new Date().toLocaleTimeString(),
        activities: [
          {
            time: new Date().toLocaleTimeString(),
            ip: log.ip,
            event: log.threat
            ? log.threatType
            : log.method,
            priority:log.priority,
          },
          ...(prev.activities || []),
        ].slice(0, 20),
      }));
  });

      return () => {
        socket.off("liveLog");
      };
    }, []);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const data = await getMonitoringStatus();
      console.log("Status from backend:", data.monitoring);
      setMonitoring(data.monitoring);

    } catch (error) {
      console.error(error);
    }
  };

  const handleStart = async () => {
    try{
        console.log("Start button clicked");
        const data = await startMonitoring();

        await loadStatus();

        toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        });
    }catch(err){
         console.error(err);

            toast({
            title: err.response?.data?.message || "Failed to start monitoring",
            status: "error",
            duration: 3000,
            isClosable: true,
            });
        }
    };

  const handleStop = async () => {
    try{
        console.log("Stop button clicked");
        const data = await stopMonitoring();

        await loadStatus();

        toast({
        title: data.message,
        status: "info",
        duration: 3000,
        isClosable: true,
        });
    }catch (err) {
        console.error(err);

        toast({
        title: err.response?.data?.message || "Failed to stop monitoring",
        status: "error",
        duration: 3000,
        isClosable: true,
        });
    }
  };
  const handleSaveConfig = async (config) => {
        try {
            const data =
            await saveMonitoringConfig(config);

            setMonitoring(data.monitoring);

            toast({
            title: data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            });

        } catch (error) {
            toast({
            title: "Failed to save configuration",
            status: "error",
            duration: 3000,
            isClosable: true,
            });
        }
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

        <MonitoringConfig
            source={monitoring.source}
            logPath={monitoring.logPath}
            onSave={handleSaveConfig}
        />

      <MonitoringControls
            status={monitoring.status}
            onStart={handleStart}
            onStop={handleStop}
      />

      <MonitoringActivity
            activities={monitoring.activities || []}
        />

    </DashboardLayout>
  );
}

export default LiveMonitoring;