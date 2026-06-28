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

import { Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import ThreatDetailsModal from "./ThreatDetailsModal";

function ThreatTable({ threats }) {
  const getColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "red";
      case "High":
        return "orange";
      case "Medium":
        return "yellow";
      default:
        return "gray";
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedThreat, setSelectedThreat] = useState(null);

    const handleView = (threat) => {
    setSelectedThreat(threat);
    onOpen();
    };

  return (
    <Box bg="white" p={6} rounded="lg" shadow="md">
      <Heading size="md" mb={5}>
        All Detected Threats
      </Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>IP Address</Th>
            <Th>Threat</Th>
            <Th>Severity</Th>
            <Th>Priority</Th>
            <Th>MITRE</Th>
            <Th>Timestamp</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {threats.map((threat) => (
            <Tr key={threat._id}>
              <Td>{threat.ip}</Td>
              <Td>{threat.threatType}</Td>
              <Td>{threat.severity}</Td>
              <Td>
                <Badge colorScheme={getColor(threat.priority)}>
                  {threat.priority}
                </Badge>
              </Td>
              <Td>{threat.mitreTechnique}</Td>
              <Td>{threat.timestamp}</Td>
              <td>
                <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleView(threat)}
                >
                    View
                </Button>
              </td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ThreatDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        threat={selectedThreat}
        />
    </Box>
  );
}

export default ThreatTable;