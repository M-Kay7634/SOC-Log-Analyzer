import {
  Box,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import StatusBadge from '../common/StatusBadge';
import EmptyState from "../common/EmptyState";

function RecentThreatTable({ threats }) {
  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );

  if (!threats.length) {
    return (
      <Box
        bg={cardBg}
        p={6}
        rounded="lg"
        shadow="md"
      >
        <Heading size="md" mb={5}>
          Recent Threats
        </Heading>

        <EmptyState
          title="No Recent Threats"
          description="No threats have been detected yet."
        />
      </Box>
    );
  }

  const hoverBg = useColorModeValue(
    "gray.50",
    "gray.700"
  );
  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Recent Threats
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>IP</Th>
              <Th>Threat</Th>
              <Th>Priority</Th>
              <Th>MITRE</Th>
              <Th>Time</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {threats.map((item) => (
              <Tr
                key={item._id}
                _hover={{
                  bg: hoverBg,
                  cursor: "pointer",
                }}
              >
                <Td>{item.ip}</Td>

                <Td>{item.threatType}</Td>

                <Td>
                  <StatusBadge
                    value={item.priority}
                    type="priority"
                  />
                </Td>

                <Td>{item.mitreTechnique}</Td>

                <Td>{item.timestamp}</Td>
                <Td>
                  <Button
                    size="xs"
                    colorScheme="blue"
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default RecentThreatTable;