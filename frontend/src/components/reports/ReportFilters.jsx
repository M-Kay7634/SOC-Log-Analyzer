import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Select,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";

function ReportFilters({ onGenerate }) {
  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [severity, setSeverity] = useState("");
  const [threatType, setThreatType] = useState("");

  const handleGenerate = () => {
    onGenerate({
      startDate,
      endDate,
      severity,
      threatType,
    });
  };

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Generate Report
      </Heading>

      <Divider mb={5} />

      <HStack spacing={4} flexWrap="wrap">

        <Input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
        />

        <Input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
        />

        <Select
          placeholder="Severity"
          value={severity}
          onChange={(e) =>
            setSeverity(e.target.value)
          }
        >
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>

        <Select
          placeholder="Threat Type"
          value={threatType}
          onChange={(e) =>
            setThreatType(e.target.value)
          }
        >
          <option value="SQL Injection">
            SQL Injection
          </option>

          <option value="XSS">
            XSS
          </option>

          <option value="Brute Force">
            Brute Force
          </option>

          <option value="Path Traversal">
            Path Traversal
          </option>

          <option value="Command Injection">
            Command Injection
          </option>
        </Select>

        <Button
          colorScheme="blue"
          onClick={handleGenerate}
        >
          Generate Report
        </Button>

      </HStack>
    </Box>
  );
}

export default ReportFilters;