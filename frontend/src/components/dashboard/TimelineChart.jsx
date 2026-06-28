import { Box, Heading, useColorModeValue, } from "@chakra-ui/react";

import {
  Line,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function TimelineChart({ timeline }) {
  const data = {
    labels: timeline.map((item) =>
      item.timestamp.split(":").slice(1, 3).join(":")
    ),

    datasets: [
      {
        label: "Threats",
        data: timeline.map((item) => item.threats),

        borderColor: "#3182ce",
        backgroundColor: "#3182ce",
        tension: 0.4,
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
        Threat Timeline
      </Heading>

      <Box h="320px">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </Box>
    </Box>
  );
}

export default TimelineChart;