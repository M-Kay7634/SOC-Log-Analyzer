import { Heading, SimpleGrid, VStack, Text, } from "@chakra-ui/react";
import { useState, useCallback, } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ReportSummary from "../components/reports/ReportSummary";
import ReportFilters from "../components/reports/ReportFilters";
import ReportTable from "../components/reports/ReportTable";
import ExportButtons from "../components/reports/ExportButtons";
import ReportHistoryTable from '../components/reports/ReportHistoryTable';

function Reports() {
  const [filters, setFilters] = useState({});

  const handleGenerate = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);
  return (
    <DashboardLayout>
      <Heading mb={6}>
        Reports & Analytics
      </Heading>
      <Text color="gray.500" mb={6}>
        Generate, export and manage security reports.
      </Text>

      <VStack spacing={6} align="stretch">

        <ReportFilters onGenerate={handleGenerate} />

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={6}
          alignItems="start"
        >
          <ReportSummary />
          <ExportButtons filters={filters} />
        </SimpleGrid>

        <ReportTable filters={filters} />

        <ReportHistoryTable />

      </VStack>
    </DashboardLayout>
  );
}

export default Reports;