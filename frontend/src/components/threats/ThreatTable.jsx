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
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { Button, useDisclosure } from "@chakra-ui/react";
import { useState, useRef } from "react";
import ThreatDetailsModal from "./ThreatDetailsModal";

function ThreatTable({ threats, onDelete }) {
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
    const cancelRef = useRef();

    const [deleteThreat, setDeleteThreat] = useState(null);

    const {
      isOpen: isDeleteOpen,
      onOpen: onDeleteOpen,
      onClose: onDeleteClose,
    } = useDisclosure();

    const handleView = (threat) => {
    setSelectedThreat(threat);
    onOpen();
    };

    const handleDeleteClick = (threat) => {
      setDeleteThreat(threat);
      onDeleteOpen();
    };

    const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box bg={cardBg} p={6} rounded="lg" shadow="md">
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

                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() =>
                    handleDeleteClick(threat)
                  }
                >
                  Delete
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
        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
        >
          <AlertDialogOverlay>

            <AlertDialogContent>

              <AlertDialogHeader>
                Delete Log
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this log?

                <br /><br />

                <strong>IP:</strong>{" "}
                {deleteThreat?.ip}

                <br />

                <strong>Threat:</strong>{" "}
                {deleteThreat?.threatType}
              </AlertDialogBody>

              <AlertDialogFooter>

                <Button
                  ref={cancelRef}
                  onClick={onDeleteClose}
                >
                  Cancel
                </Button>

                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={() => {
                    onDelete(deleteThreat._id);
                    onDeleteClose();
                  }}
                >
                  Delete
                </Button>

              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialogOverlay>
        </AlertDialog>
    </Box>
  );
}

export default ThreatTable;