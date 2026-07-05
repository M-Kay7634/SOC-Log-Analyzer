import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  TableContainer,
} from "@chakra-ui/react";
import {memo } from "react";
import EmptyState from "../common/EmptyState";

function TopIPs({ topIPs }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const getSeverityColor = (severity) => {
    switch (severity) {
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
  if (!topIPs.length) {
    return (
      <Box
        bg={cardBg}
        p={6}
        rounded="lg"
        shadow="md"
      >
        <Heading size="md" mb={5}>
          Top Attacking IPs
        </Heading>

        <EmptyState
          title="No IP Activity"
          description="Upload logs to identify attacking IP addresses."
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
        Top Attacking IPs
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>IP Address</Th>
              <Th isNumeric>Attacks</Th>
              <Th>Severity</Th>
            </Tr>
          </Thead>

          <Tbody>
            {topIPs.map((ip, index) => (
              <Tr key={ip.ip} _hover={{bg: "gray.700"}} cursor="pointer">
                <Td>{index + 1}</Td>

                <Td fontWeight="bold">
                  {ip.ip}
                </Td>

                <Td isNumeric>
                  {ip.attacks}
                </Td>

                <Td>
                  <Badge
                      colorScheme={getSeverityColor(
                          ip.highestSeverity
                      )}
                  >
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default memo(TopIPs);