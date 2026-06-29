import {
  Box,
  Badge,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FiActivity,
  FiClock,
  FiFileText,
  FiServer,
} from "react-icons/fi";

function MonitoringHeader({
  status,
  source,
  logPath,
  startedAt,
  lastEvent,
}) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      mb={6}
    >
      <Heading size="md" mb={5}>
        Live Monitoring Status
      </Heading>

      <Divider mb={5} />

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2,1fr)",
        }}
        gap={5}
      >
        <GridItem>
          <HStack spacing={3}>
            <Icon
              as={FiActivity}
              color={
                status === "Active"
                  ? "green.500"
                  : "red.500"
              }
            />

            <Text fontWeight="bold">
              Status
            </Text>

            <Badge
              colorScheme={
                status === "Active"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </Badge>
          </HStack>
        </GridItem>

        <GridItem>
          <HStack spacing={3}>
            <Icon
              as={FiServer}
              color="blue.500"
            />

            <Text fontWeight="bold">
              Source
            </Text>

            <Text>{source}</Text>
          </HStack>
        </GridItem>

        <GridItem colSpan={2}>
          <HStack align="start">
            <Icon
              as={FiFileText}
              mt={1}
              color="orange.500"
            />

            <Box>
              <Text fontWeight="bold">
                Log File
              </Text>

              <Text
                color="gray.500"
                wordBreak="break-all"
              >
                {logPath ||
                  "No log file configured"}
              </Text>
            </Box>
          </HStack>
        </GridItem>

        <GridItem>
          <HStack spacing={3}>
            <Icon
              as={FiClock}
              color="purple.500"
            />

            <Box>
              <Text fontWeight="bold">
                Started At
              </Text>

              <Text color="gray.500">
                {startedAt || "--"}
              </Text>
            </Box>
          </HStack>
        </GridItem>

        <GridItem>
          <HStack spacing={3}>
            <Icon
              as={FiActivity}
              color="teal.500"
            />

            <Box>
              <Text fontWeight="bold">
                Last Event
              </Text>

              <Text color="gray.500">
                {lastEvent ||
                  "Waiting for activity..."}
              </Text>
            </Box>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default MonitoringHeader;