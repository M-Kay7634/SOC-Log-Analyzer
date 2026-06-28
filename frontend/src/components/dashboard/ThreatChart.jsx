import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ThreatChart({ distribution }) {
  const data = {
    labels: distribution.map((item) => item.threatType),

    datasets: [
      {
        data: distribution.map((item) => item.count),

        backgroundColor: [
          "#e53e3e",
          "#dd6b20",
          "#3182ce",
          "#38a169",
          "#805ad5",
        ],
      },
    ],
  };

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
      h="420px"
    >
      <Heading size="md" mb={5}>
        Threat Distribution
      </Heading>

      <Box
        h="320px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default ThreatChart;