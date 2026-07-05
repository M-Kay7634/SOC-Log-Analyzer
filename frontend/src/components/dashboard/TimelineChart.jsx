import { Box, Heading, useColorModeValue, } from "@chakra-ui/react";

import {
  Line,
} from "react-chartjs-2";
import { useMemo, memo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import EmptyState from "../common/EmptyState";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function TimelineChart({ timeline }) {
  const data = useMemo(() => ({
    labels: timeline.map(item =>
      item.timestamp.split(":").slice(1, 3).join(":")
    ),

    datasets: [
      {
        label: "Threats",
        data: timeline.map(item => item.threats),
        borderColor: "#3182ce",
        backgroundColor: "rgba(49,130,206,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  }), [timeline]);

  const cardBg = useColorModeValue("white", "gray.800");

  if (!timeline.length) {
    return (
      <Box
        bg={cardBg}
        p={6}
        rounded="lg"
        shadow="md"
        h="420px"
      >
        <Heading size="md" mb={5}>
          Threat Activity Timeline
        </Heading>

        <EmptyState
          title="No Timeline Data"
          description="Upload logs to visualize threat activity over time."
        />
      </Box>
    );
  }

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
      h="420px"
    >
      <Heading size="md" mb={5}>
        Threat Activity Timeline
      </Heading>

      <Box h="320px">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
             y: {
              beginAtZero: true,
              grid: {
                color: "rgba(255,255,255,0.08)",
              },
            },

            x: {
              grid: {
                display: false,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default memo(TimelineChart);