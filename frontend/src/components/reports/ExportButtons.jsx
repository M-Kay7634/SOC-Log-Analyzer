import { Box, Button, Heading, VStack, useColorModeValue, useToast,} from "@chakra-ui/react";
import { useState, memo,  } from "react";
import {DownloadIcon,} from "@chakra-ui/icons";

import {exportCSV, exportExcel, exportPDF,} from "../../services/reportService";

const downloadFile = (data, filename) => {
  const url = window.URL.createObjectURL(
    new Blob([data])
  );

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(url);
};

function ExportButtons({filters}) {
  const [loading, setLoading] = useState("");

  const handleCSV = async () => {
    try{
      const data = await exportCSV(filters);
      downloadFile(data, "SOC_Report.csv");
      
    }catch (error){
      toast({
        title: "CSV export failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }finally{
      setLoading("");
    }
  };

  const handleExcel = async () => {
    try{
      const data = await exportExcel(filters);

      downloadFile(data, "SOC_Report.xlsx");

    }catch (error){
      toast({
        title: "Excel export failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally{
      setLoading("");
    }
  };

  const handlePDF = async () => {
    try{
      const data = await exportPDF(filters);

      downloadFile(data, "SOC_Report.pdf");
      
    }catch (error){
      toast({
        title: "PDF export failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally{
      setLoading("");
    }
  };

  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );

  return (
    <Box bg={cardBg} p={6} rounded="lg" shadow="md">
      <Heading size="md" mb={4}>
        Export Report
      </Heading>

      <VStack spacing={4}>
        <Button
         colorScheme="blue" 
         w="100%" 
         onClick={handleCSV} 
         isLoading={loading === "csv"}
         isDisabled={loading !== ""}
         leftIcon={<DownloadIcon />}
        >
          Export CSV
        </Button>

        <Button 
          colorScheme="green" 
          w="100%" 
          onClick={handleExcel}
          isLoading={loading === "excel"}
          isDisabled={loading !== ""}
          leftIcon={<DownloadIcon />}
        >
          Export Excel
        </Button>

        <Button 
          colorScheme="red" 
          w="100%" 
          onClick={handlePDF}
          isLoading={loading === "pdf"}
          isDisabled={loading !== ""}
          leftIcon={<DownloadIcon />}
        >
          Export PDF
        </Button>
      </VStack>
    </Box>
  );
}

export default memo(ExportButtons);