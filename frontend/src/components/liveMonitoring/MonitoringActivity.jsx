import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";

function MonitoringActivity({
  activities = [],
}) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Recent Monitoring Activity
      </Heading>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Event</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>

        <Tbody>
          {activities.length === 0 ? (
            <Tr>
              <Td colSpan={3}>
                Waiting for monitoring...
              </Td>
            </Tr>
          ) : (
            activities.map((item, index) => (
              <Tr key={index}>
                <Td>{item.time}</Td>
                <Td>{item.event}</Td>
                <Td>{item.status}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

export default MonitoringActivity;