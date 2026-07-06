import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  Tooltip
} from "@chakra-ui/react";
import { memo } from "react";
import {
  FiActivity,
  FiClock,
  FiFileText,
  FiServer,
} from "react-icons/fi";

import StatusBadge from "../common/StatusBadge";

function MonitoringHeader({
  status,
  source,
  logPath,
  startedAt,
  lastEvent,
}) {
  const bg = useColorModeValue("white", "gray.800");
  const secondaryText = useColorModeValue("gray.600", "gray.400");

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
                status === "Running"
                  ? "green.500"
                  : "red.500"
              }
            />

            <Text fontWeight="bold">
              Status
            </Text>

            <StatusBadge
              value={status}
              type="monitoring"
            />
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
                Local Log File Path
              </Text>

              <Tooltip label={logPath}>
                <Text
                  color={secondaryText}
                  noOfLines={1}
                >
                  {logPath || "No log file configured"}
                </Text>
              </Tooltip>
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

              <Text color={secondaryText}>
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

              <Text color={secondaryText}>
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

export default memo(MonitoringHeader);