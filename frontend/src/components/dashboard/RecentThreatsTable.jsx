import {
  Badge,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

function ThreatTable({ threats }) {
  const getBadgeColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "red";
      case "High":
        return "orange";
      case "Medium":
        return "yellow";
      default:
        return "green";
    }
  };

  return (
    <Box
      bg="white"
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Recent Threats
      </Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>IP</Th>
            <Th>Threat</Th>
            <Th>Priority</Th>
            <Th>MITRE</Th>
            <Th>Time</Th>
          </Tr>
        </Thead>

        <Tbody>
          {threats.map((item) => (
            <Tr key={item._id}>
              <Td>{item.ip}</Td>

              <Td>{item.threatType}</Td>

              <Td>
                <Badge colorScheme={getBadgeColor(item.priority)}>
                  {item.priority}
                </Badge>
              </Td>

              <Td>{item.mitreTechnique}</Td>

              <Td>{item.timestamp}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default ThreatTable;