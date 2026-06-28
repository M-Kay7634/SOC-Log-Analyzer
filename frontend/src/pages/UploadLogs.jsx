import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { uploadLog } from "../services/logService";
import { useNavigate } from "react-router-dom";

function UploadLogs() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Please select a log file",
        status: "warning",
        duration: 3000,
      });

      return;
    }

    try {
      setLoading(true);

      const data = await uploadLog(file);

      toast({
        title: data.message,
        description: `${data.totalLogs} logs uploaded successfully`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setFile(null);

      // Redirect after showing the toast
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      toast({
        title: error.response?.data?.message || "Upload failed",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="md"
        maxW="600px"
      >
        <Heading mb={6}>
          Upload Apache Log
        </Heading>

        <VStack align="stretch" gap={5}>

          <Input
            type="file"
            accept=".log,.txt"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {file && (
            <Text>
              Selected File: <b>{file.name}</b>
            </Text>
          )}

          <Button
            colorScheme="blue"
            onClick={handleUpload}
            loading={loading}
          >
            Upload & Analyze
          </Button>

        </VStack>
      </Box>
    </DashboardLayout>
  );
}

export default UploadLogs;