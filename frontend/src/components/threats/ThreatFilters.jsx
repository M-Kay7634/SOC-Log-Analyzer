import {
  Box,
  Input,
  Select,
  HStack,
} from "@chakra-ui/react";

function ThreatFilters({
  search,
  setSearch,
  priority,
  setPriority,
}) {
  return (
    <Box
      bg="white"
      p={5}
      rounded="lg"
      shadow="md"
      mb={6}
    >
      <HStack spacing={4}>
        <Input
          placeholder="Search by IP or Threat..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <Select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          width="220px"
        >
          <option value="">All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
      </HStack>
    </Box>
  );
}

export default ThreatFilters;