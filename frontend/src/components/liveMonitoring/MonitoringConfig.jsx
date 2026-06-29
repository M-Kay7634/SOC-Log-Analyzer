import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

function MonitoringConfig({
  source,
  logPath,
  onSave,
}) {
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();

  const [selectedSource, setSelectedSource] = useState(source);
  const [selectedPath, setSelectedPath] = useState(logPath);

  const handleBrowse = () => {
    toast({
      title: "Coming Soon",
      description:
        "File picker will be added in the next lesson.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSave = () => {
    onSave({
      source: selectedSource,
      logPath: selectedPath,
    });
  };

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      mb={6}
    >
      <Heading size="md" mb={5}>
        Log Source Configuration
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Log Source</FormLabel>

        <Select
          value={selectedSource}
          onChange={(e) =>
            setSelectedSource(e.target.value)
          }
        >
          <option>Apache</option>
          <option>Nginx</option>
          <option>IIS</option>
          <option>Custom</option>
        </Select>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Log File</FormLabel>

        <Input
          placeholder="Enter log file path..."
          value={selectedPath}
          onChange={(e) =>
            setSelectedPath(e.target.value)
          }
        />
      </FormControl>

      <HStack>
        <Button
          onClick={handleBrowse}
          colorScheme="gray"
        >
          Browse
        </Button>

        <Button
          colorScheme="blue"
          onClick={handleSave}
        >
          Save Configuration
        </Button>
      </HStack>
    </Box>
  );
}

export default MonitoringConfig;