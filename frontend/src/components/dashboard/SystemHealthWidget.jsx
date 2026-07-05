import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import {CheckCircleIcon,} from "@chakra-ui/icons";
import { memo } from "react";

const SERVICES = [
    "Backend API",
    "MongoDB",
    "Socket.IO",
    "Email Alerts",
    "Live Monitoring",
  ];

function SystemHealthWidget() {
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50","gray.700");


  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      minH="420px"
    >
      <Heading size="md" mb={5}>
        System Health Status
      </Heading>

      <VStack spacing={4} align="stretch">
        {SERVICES.map((service) => (
          <HStack
            key={service}
            justify="space-between"
            p={2}
            rounded="md"
            _hover={{
              bg: hoverBg,
            }}
          >
            <Text fontWeight="600">{service}</Text>

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

export default memo(SystemHealthWidget);