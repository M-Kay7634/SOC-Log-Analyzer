import { Box, Heading, useColorModeValue, } from "@chakra-ui/react";
import { useMemo, memo } from "react";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import EmptyState from "../common/EmptyState";
import { PIE_COLORS } from "../../constants/chartColors";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ThreatChart({ distribution }) {
  const data = useMemo(() => ({
    labels: distribution.map(
      (item) => item.threatType
    ),

    datasets: [
      {
        data: distribution.map(
          (item) => item.count
        ),

        backgroundColor: PIE_COLORS,
      },
    ],
  }), [distribution]);

  const cardBg = useColorModeValue("white", "gray.800");

  if (!distribution.length) {
    return (
      <Box
        bg={cardBg}
        p={6}
        rounded="lg"
        shadow="md"
        h="420px"
      >
        <Heading size="md" mb={5}>
          Threat Distribution by Type
        </Heading>

        <EmptyState
          title="No Threat Data"
          description="Upload logs to visualize threat distribution."
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
        Threat Distribution by Type
      </Heading>

      <Box
        h="320px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        aria-label="Threat distribution chart"
      >
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  boxWidth: 15,
                  padding: 20,
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default memo(ThreatChart);