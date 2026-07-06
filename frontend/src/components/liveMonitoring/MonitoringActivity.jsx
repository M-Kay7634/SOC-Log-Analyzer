import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  Divider,
  useColorModeValue,
  SlideFade,
} from "@chakra-ui/react";
import { memo } from "react";
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
function MonitoringActivity({
  activities = [],
}) {
  const bg = useColorModeValue("white", "gray.800")

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      mt={6}
    >
      <Heading size="md" mb={5}>
        Live Event Feed
      </Heading>

      <VStack spacing={4} align="stretch">
        {activities.length === 0 ? (
          <Text color="gray.500">
            <EmptyState
  title="No Live Events"
  description="Start monitoring to view incoming log events."
/>
          </Text>
        ) : (
          activities.map((item, index) => (
            <SlideFade
              key={item.id}
              in={true}
              offsetY="10px"
            >
              <Box
                borderWidth="1px"
                borderRadius="md"
                p={4}
              >
                <HStack
                  justify="space-between"
                  mb={2}
                >
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                  >
                    {item.time}
                  </Text>

                  <StatusBadge
                    value={item.priority || "Normal"}
                    type="priority"
                  />
                </HStack>

                <Text>
                  <strong>IP:</strong>{" "}
                  {item.ip || "-"}
                </Text>

                <Text>
                  <strong>Event:</strong>{" "}
                  {item.event}
                </Text>

                <Divider mt={3} />
              </Box>
            </SlideFade>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default memo(MonitoringActivity);