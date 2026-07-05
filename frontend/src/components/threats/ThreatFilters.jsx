import {
  Box,
  Select,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { memo } from "react";

import SearchBar from "../common/SearchBar";

function ThreatFilters({
  search,
  setSearch,
  priority,
  setPriority,
}) {
  const cardBg = useColorModeValue("white", "gray.800");
  return (
    <Box
      bg={cardBg}
      p={5}
      rounded="lg"
      shadow="md"
      mb={6}
    >
      <HStack
        spacing={4}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        align="stretch"
      >
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search IP, Country, Threat..."
      />

        <Select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          width={{
            base: "100%",
            md: "220px",
          }}
          aria-label="Filter by priority"
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

export default memo(ThreatFilters);