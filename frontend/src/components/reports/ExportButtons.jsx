import { Box, Button, Heading, VStack } from "@chakra-ui/react";

import { exportCSV } from "../../services/reportService";
import { exportExcel } from "../../services/reportService";
import { exportPDF } from "../../services/reportService";

function ExportButtons({filters}) {
  const handleCSV = async () => {
    const data = await exportCSV(filters);

    const url = window.URL.createObjectURL(
      new Blob([data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = "SOC_Report.csv";

    link.click();
  };

  const handleExcel = async () => {
    const data = await exportExcel(filters);

    const url = window.URL.createObjectURL(
      new Blob([data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = "SOC_Report.xlsx";

    link.click();
  };

  const handlePDF = async () => {
    const data = await exportPDF(filters);

    const url = window.URL.createObjectURL(
      new Blob([data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = "SOC_Report.pdf";

    link.click();
  };

  return (
    <Box bg="white" p={6} rounded="lg" shadow="md">
      <Heading size="md" mb={4}>
        Export Report
      </Heading>

      <VStack>
        <Button colorScheme="blue" w="100%" onClick={handleCSV}>
          Export CSV
        </Button>

        <Button colorScheme="green" w="100%" onClick={handleExcel}>
          Export Excel
        </Button>

        <Button colorScheme="red" w="100%" onClick={handlePDF}>
          Export PDF
        </Button>
      </VStack>
    </Box>
  );
}

export default ExportButtons;