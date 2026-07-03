import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ReportSummary from "../components/reports/ReportSummary";
import ReportFilters from "../components/reports/ReportFilters";
import ReportTable from "../components/reports/ReportTable";
import ExportButtons from "../components/reports/ExportButtons";
import ReportHistoryTable from '../components/reports/ReportHistoryTable';

function Reports() {
  const [filters, setFilters] = useState({});
  return (
    <DashboardLayout>
      <Heading mb={6}>
        Reports
      </Heading>

      <VStack spacing={6} align="stretch">

        <ReportFilters onGenerate={setFilters} />

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={6}
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