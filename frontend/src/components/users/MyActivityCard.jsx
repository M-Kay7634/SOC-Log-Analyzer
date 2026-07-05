import {
  Box,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { memo } from "react";
import StatCard from "../common/StatCard";

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
        My Activity
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg:3 }} spacing={6}>
        <StatCard
          title="Uploaded Logs"
          value={stats?.uploadedLogs || 0}
          borderColor="blue.500"
        />

        <StatCard
          title="Threats Found"
          value={stats?.threats || 0}
          borderColor="red.500"
        />

        <StatCard
          title="Reports Generated"
          value={stats?.reports || 0}
          borderColor="green.500"
        />
      </SimpleGrid>
    </Box>
  );
}

export default memo(MyActivityCard);