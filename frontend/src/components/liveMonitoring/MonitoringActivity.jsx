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

function MonitoringActivity({
  activities = [],
}) {
  const bg = useColorModeValue("white", "gray.800");

  const getColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "red";
      case "High":
        return "orange";
      case "Medium":
        return "yellow";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

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
            Waiting for monitoring...
          </Text>
        ) : (
          activities.map((item, index) => (
            <SlideFade
              key={index}
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

                  <Badge
                    colorScheme={getColor(
                      item.priority
                    )}
                  >
                    {item.priority || "Normal"}
                  </Badge>
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

export default MonitoringActivity;