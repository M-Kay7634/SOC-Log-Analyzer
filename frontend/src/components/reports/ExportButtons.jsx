import { Box, Button, Heading, VStack } from "@chakra-ui/react";

function ExportButtons() {
  return (
    <Box bg="white" p={6} rounded="lg" shadow="md">
      <Heading size="md" mb={4}>
        Export Report
      </Heading>

      <VStack>
        <Button colorScheme="blue" w="100%">
          Export CSV
        </Button>

        <Button colorScheme="green" w="100%">
          Export Excel
        </Button>

        <Button colorScheme="red" w="100%">
          Export PDF
        </Button>
      </VStack>
    </Box>
  );
}

export default ExportButtons;