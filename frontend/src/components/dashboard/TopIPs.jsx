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
} from "@chakra-ui/react";

function TopIPs({ topIPs }) {
  return (
    <Box
      bg="white"
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Top Attacking IPs
      </Heading>

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
            <Tr key={ip.ip}>
              <Td>{index + 1}</Td>

              <Td fontWeight="bold">
                {ip.ip}
              </Td>

              <Td isNumeric>
                {ip.attacks}
              </Td>

              <Td>
                <Badge colorScheme="red">
                  {ip.highestSeverity}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default TopIPs;