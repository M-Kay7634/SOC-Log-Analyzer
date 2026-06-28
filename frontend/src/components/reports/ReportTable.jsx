import {
  Badge,
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

import { useEffect, useState } from "react";

import { getReportLogs } from "../../services/reportService";

function ReportTable({filters}) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const cardBg = useColorModeValue(
    "white",
    "gray.800"
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center h="300px">
        <Spinner size="xl" />
      </Center>
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
              <Tr key={log._id}>

                <Td>{log.ip}</Td>

                <Td>
                  {log.threatType || "-"}
                </Td>

                <Td>{log.severity || "-"}</Td>

                <Td>
                  <Badge
                    colorScheme={
                      log.priority === "Critical"
                        ? "red"
                        : log.priority === "High"
                        ? "orange"
                        : log.priority === "Medium"
                        ? "yellow"
                        : log.priority === "Low"
                        ? "green"
                        : "gray"
                    }
                  >
                    {log.priority}
                  </Badge>
                </Td>

                <Td>{log.status}</Td>

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

export default ReportTable;