import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  useToast,
  Divider,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import { uploadLog } from "../services/logService";

function UploadLogs() {
  const [file, setFile] = useState(null);
  const [source, setSource] = useState("Apache");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Please select a log file",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const data = await uploadLog(file,source);

      setResult(data);

      toast({
        title: "Upload Successful",
        description: `${data.totalLogs} logs analyzed successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFile(null);

    } catch (error) {
      toast({
        title: error.response?.data?.message || "Upload Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const threatCount =
    result?.analyzedLogs.filter((log) => log.threat).length || 0;

  const criticalCount =
    result?.analyzedLogs.filter(
      (log) => log.priority === "Critical"
    ).length || 0;

  const highCount =
    result?.analyzedLogs.filter(
      (log) => log.priority === "High"
    ).length || 0;

  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );
  const secondaryText = useColorModeValue(
    "gray.600",
    "gray.400"
  );
  const infoBg = useColorModeValue(
    "gray.50",
    "gray.700"
  );
  return (
    <DashboardLayout>
      <Box
        bg={cardBg}
        p={8}
        rounded="lg"
        shadow="lg"
        maxW="700px"
      >
        <Heading mb={8}>
          Upload Log File
        </Heading>

        <VStack spacing={6} align="stretch">

          <Select
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="Apache">Apache</option>
            <option value="Linux">Linux</option>
            <option value="Windows">Windows</option>
          </Select>

          <Box
            border="2px dashed"
            borderColor="blue.300"
            rounded="lg"
            p={10}
            textAlign="center"
          >
            <FaCloudUploadAlt
              size={60}
              color="#3182ce"
            />

            <Text
              mt={4}
              fontSize="lg"
              fontWeight="bold"
            >
              Select {source} Log File
            </Text>

            <Text color={secondaryText} mb={5}>
              Supported format: .log
            </Text>

            <Input
              type="file"
              accept=".log,.txt"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Box>

          {file && (
            <Box
              bg={infoBg}
              p={4}
              rounded="md"
            >
              <Text>
                <strong>File:</strong> {file.name}
              </Text>

              <Text>
                <strong>Size:</strong>{" "}
                {(file.size / 1024).toFixed(2)} KB
              </Text>
            </Box>
          )}

          <Button
            colorScheme="blue"
            onClick={handleUpload}
            isLoading={loading}
          >
            Upload & Analyze
          </Button>

          {result && (
            <>
              <Divider />

              <Heading size="md">
                Upload Summary
              </Heading>

              <HStack spacing={5} flexWrap="wrap">

                <Stat
                  p={4}
                  borderWidth="1px"
                  rounded="md"
                >
                  <StatLabel>Total Logs</StatLabel>
                  <StatNumber>{result.totalLogs}</StatNumber>
                </Stat>

                <Stat
                  p={4}
                  borderWidth="1px"
                  rounded="md"
                >
                  <StatLabel>Threats</StatLabel>
                  <StatNumber>{threatCount}</StatNumber>
                </Stat>

                <Stat
                  p={4}
                  borderWidth="1px"
                  rounded="md"
                >
                  <StatLabel>Critical</StatLabel>
                  <StatNumber>{criticalCount}</StatNumber>
                </Stat>

                <Stat
                  p={4}
                  borderWidth="1px"
                  rounded="md"
                >
                  <StatLabel>High</StatLabel>
                  <StatNumber>{highCount}</StatNumber>
                </Stat>

              </HStack>

              <HStack pt={4} spacing={4}>

                <Button
                  colorScheme="green"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                  }}
                >
                  Upload Another File
                </Button>

              </HStack>
            </>
          )}

        </VStack>
      </Box>
    </DashboardLayout>
  );
}

export default UploadLogs;