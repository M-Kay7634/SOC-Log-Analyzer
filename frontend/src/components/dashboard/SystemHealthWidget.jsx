import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  CheckCircleIcon,
} from "@chakra-ui/icons";

function SystemHealthWidget() {
  const bg = useColorModeValue("white", "gray.800");

  const services = [
    "Backend API",
    "MongoDB",
    "Socket.IO",
    "Email Alerts",
    "Live Monitoring",
  ];

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        System Health
      </Heading>

      <VStack spacing={4} align="stretch">
        {services.map((service) => (
          <HStack
            key={service}
            justify="space-between"
          >
            <Text>{service}</Text>

            <HStack spacing={2}>
              <Icon
                as={CheckCircleIcon}
                color="green.400"
              />

              <Text
                color="green.400"
                fontWeight="bold"
              >
                Online
              </Text>
            </HStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

export default SystemHealthWidget;