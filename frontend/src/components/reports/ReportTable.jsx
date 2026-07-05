import {
  Box,
  Heading,
  Spinner,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";

import { useEffect, useState, memo, } from "react";

import { getReportLogs } from "../../services/reportService";
import StatusBadge from "../common/StatusBadge";
import LoadingSkeleton from "../common/LoadingSkeleton";
import EmptyState from "../common/EmptyState";

function ReportTable({filters}) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );
  const hoverBg = useColorModeValue(
    "gray.50",
    "gray.700"
  );

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    try {
      const data = await getReportLogs(filters);
      setLogs(data.logs);
    } catch (error) {
      console.error(error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!logs.length) {
    return (
      <Box
        bg={cardBg}
        p={6}
        rounded="lg"
        shadow="md"
      >
        <Heading size="md" mb={5}>
          Report Logs
        </Heading>

        <EmptyState
          title="No Logs Found"
          description="Try changing the report filters."
        />
      </Box>
    );
  }

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Report Logs
      </Heading>

      <TableContainer>
        <Table variant="simple">

          <Thead>
            <Tr>
              <Th>IP</Th>
              <Th>Threat</Th>
              <Th>Severity</Th>
              <Th>Priority</Th>
              <Th>Status</Th>
              <Th>Method</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>

          <Tbody>

            {logs.map((log) => (
              <Tr
                key={log._id}
                _hover={{
                  bg: hoverBg,
                }}
              >

                <Td>{log.ip}</Td>

                <Td>
                  {log.threatType || "-"}
                </Td>

                <Td>{log.severity || "-"}</Td>

                <Td>
                  <StatusBadge
                    value={log.priority}
                    type="priority"
                  />
                </Td>

                <Td>
                  <StatusBadge
                    value={log.status}
                    type="status"
                  />
                </Td>

                <Td>{log.method}</Td>

                <Td>{log.timestamp}</Td>

              </Tr>
            ))}

          </Tbody>

        </Table>
      </TableContainer>

    </Box>
  );
}

export default memo(ReportTable);