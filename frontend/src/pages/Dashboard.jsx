import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <Box p={8}>
      <Heading>Welcome, {user?.name}</Heading>
      <Text mt={4}>SOC Dashboard coming next...</Text>
    </Box>
  );
}

export default Dashboard;