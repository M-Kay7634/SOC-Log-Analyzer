import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaShieldAlt } from "react-icons/fa";
import {TimeIcon} from "@chakra-ui/icons";
import { memo } from "react";

function DashboardHeader() {
  const bg = useColorModeValue("white", "gray.800");

  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const subtitleColor = useColorModeValue(
    "gray.600",
    "gray.400"
  );

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      mb={6}
      minH="120px"
    >
      <Flex
        justify="space-between"
        align={{
          base: "flex-start",
          md: "center",
        }}
        direction={{
          base: "column",
          md: "row",
        }}
        gap={4}
      >
        <HStack spacing={4}>
          <Icon
            as={FaShieldAlt}
            boxSize={10}
            color="blue.500"
            aria-label="SOC Shield"
          />

          <VStack align="start" spacing={1}>
            <Heading size="lg">
              SOC Command Center
            </Heading>

            <Text
              color={subtitleColor}
              fontSize="sm"
            >
              Real-Time Security Monitoring &
              Threat Analysis
            </Text>
          </VStack>
        </HStack>

        <HStack
          mt={{ base: 4, md: 0 }}
          spacing={3}
        >
          <TimeIcon color="gray.500" />

          <VStack spacing={0} align="start">
            <Text
              fontSize="xs"
              color="gray.500"
            >
              Last Updated
            </Text>

            <Text
              fontWeight="bold"
              fontSize="sm"
            >
              {formattedDate} • {formattedTime}
            </Text>
          </VStack>
        </HStack>
      </Flex>
    </Box>
  );
}

export default memo(DashboardHeader);