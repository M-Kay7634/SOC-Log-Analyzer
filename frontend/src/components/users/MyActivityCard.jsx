import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

function MyActivityCard({ stats }) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      mt={6}
    >
      <Heading size="md" mb={6}>
        📊 My Activity
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat>
          <StatLabel>Uploaded Logs</StatLabel>
          <StatNumber>
            {stats?.uploadedLogs || 0}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Threats Found</StatLabel>
          <StatNumber>
            {stats?.threats || 0}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Reports Generated</StatLabel>
          <StatNumber>
            {stats?.reports || 0}
          </StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}

export default MyActivityCard;