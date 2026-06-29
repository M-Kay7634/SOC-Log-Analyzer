import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FiFileText,
  FiAlertTriangle,
  FiZap,
  FiHeart,
} from "react-icons/fi";

function MonitoringStats({
  linesProcessed,
  threatsDetected,
  eventsPerMinute,
  health,
}) {
  const bg = useColorModeValue("white", "gray.800");

  const cards = [
    {
      label: "Lines Processed",
      value: linesProcessed,
      help: "Total log entries",
      icon: FiFileText,
      color: "blue.500",
    },
    {
      label: "Threats Detected",
      value: threatsDetected,
      help: "Detected threats",
      icon: FiAlertTriangle,
      color: "red.500",
    },
    {
      label: "Events / Minute",
      value: eventsPerMinute,
      help: "Monitoring speed",
      icon: FiZap,
      color: "orange.500",
    },
    {
      label: "System Health",
      value: health,
      help: "Monitoring engine",
      icon: FiHeart,
      color: "green.500",
    },
  ];

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      spacing={5}
      mb={6}
    >
      {cards.map((card) => (
        <Box
          key={card.label}
          bg={bg}
          p={5}
          rounded="lg"
          shadow="md"
        >
          <Icon
            as={card.icon}
            boxSize={6}
            color={card.color}
            mb={3}
          />

          <Stat>
            <StatLabel>{card.label}</StatLabel>

            <StatNumber>
              {card.value}
            </StatNumber>

            <StatHelpText>
              {card.help}
            </StatHelpText>
          </Stat>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default MonitoringStats;