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
  Tooltip,
  Button,
  useDisclosure,
  Checkbox,
  TableContainer,
} from "@chakra-ui/react";
import {memo,useState, useRef,} from "react";
import {LockIcon} from "@chakra-ui/icons";

import ThreatDetailsModal from "./ThreatDetailsModal";
import Pagination from "../common/Pagination";
import ConfirmDialog from "../common/ConfirmDialog";
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';

import { useAuth } from "../../context/AuthContext";

function ThreatTable({ 
  threats, 
  onDelete,
  selectedLogs,
  setSelectedLogs,
  onBulkDelete,
  page,
  setPage,
  totalPages,
}) {
  const { user } = useAuth();

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

    const handleSelectAll = (e) => {
      if (e.target.checked) {
        if (user.role === "Admin") {
          setSelectedLogs(threats.map((t) => t._id));
        } else {
          setSelectedLogs(
            threats
              .filter((t) => t.uploadedBy === user.id)
              .map((t) => t._id)
          );
        }
      } else {
        setSelectedLogs([]);
      }
    };

    const handleSelect = (id) => {
      if (selectedLogs.includes(id)) {
        setSelectedLogs(
          selectedLogs.filter((item) => item !== id)
        );
      } else {
        setSelectedLogs([...selectedLogs, id]);
      }
    };

    const cardBg = useColorModeValue("white", "gray.800");
    const hoverBg = useColorModeValue("gray.50","gray.700");

  return (
    <Box bg={cardBg} p={6} rounded="lg" shadow="md">
      <Heading size="md" mb={5}>
        All Detected Threats
      </Heading>
      {selectedLogs.length > 0 && (
        <Button
          colorScheme="red"
          mb={5}
          onClick={onBulkDelete}
        >
          Delete Selected ({selectedLogs.length})
        </Button>
      )}

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isChecked={
                    threats.length > 0 &&
                    selectedLogs.length === threats.length
                  }
                  onChange={handleSelectAll}
                />
              </Th>
              <Th>IP Address</Th>
              <Th>Country</Th>
              <Th>Region</Th>
              <Th>Uploaded By</Th>
              <Th>Threat</Th>
              <Th>Severity</Th>
              <Th>Priority</Th>
              <Th>MITRE</Th>
              <Th>Timestamp</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {threats.length === 0 ? (
              <Tr>
                <Td colSpan={11}>
                  <EmptyState
                    title="No Threats Found"
                    description="Upload logs or change the applied filters."
                  />
                </Td>
              </Tr>
            ) : (
              threats.map((threat) => (
              <Tr key={threat._id} _hover={{bg: hoverBg,}}>
                <Td>
                  {user.role === "Admin" ||
                  threat.uploadedBy?._id === user.id ? (
                    <Checkbox
                      isChecked={selectedLogs.includes(threat._id)}
                      onChange={() => handleSelect(threat._id)}
                    />
                  ) : ( <Tooltip
                            label="You can only delete logs you uploaded."
                        >
                            <LockIcon color="gray.500" />
                        </Tooltip> 
                      )}
                </Td>
                <Td>{threat.ip}</Td>
                <Td>{threat.country !== "Unknown" ? `🌍 ${threat.country}` : "-"}</Td>
                <Td>{threat.region !== "Unknown" ? threat.region : "-"}</Td>
                <Td>
                  {threat.uploadedBy?._id === user.id ? (<Badge colorScheme="green" variant="solid">You </Badge>) : (threat.uploadedBy?.name || "Unknown")}
                </Td>
                <Td>
                  {threat.threatType ? (<Badge colorScheme="purple">{threat.threatType}</Badge>) : ("-")}
                </Td>
                <Td>{threat.severity}</Td>
                <Td>
                  <StatusBadge
                    value={threat.priority}
                    type="priority"
                  />
                </Td>
                <Td>{threat.mitreTechnique}</Td>
                <Td>{threat.timestamp}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleView(threat)}
                  >
                    View
                  </Button>

                  {user.role === "Admin" ||
                  threat.uploadedBy?._id === user.id ? (
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteClick(threat)}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Tooltip label="You can only delete logs you uploaded.">
                      <LockIcon color="gray.500" />
                    </Tooltip>
                  )}
                </Td>
              </Tr>
            ))
          )}
          </Tbody>
        </Table>
      </TableContainer>
      <ThreatDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        threat={selectedThreat}
        />
        <ConfirmDialog
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          cancelRef={cancelRef}
          title="Delete Log"
          message={
            <>
              Are you sure you want to delete this log?

              <br /><br />

              <strong>IP:</strong> {deleteThreat?.ip}

              <br />

              <strong>Threat:</strong>{" "}
              {deleteThreat?.threatType}
            </>
          }
          onConfirm={() => {
            onDelete(deleteThreat._id);
            onDeleteClose();
          }}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrevious={() =>
            setPage(page - 1)
          }
          onNext={() =>
            setPage(page + 1)
          }
        />
    </Box>
  );
}

export default memo(ThreatTable);