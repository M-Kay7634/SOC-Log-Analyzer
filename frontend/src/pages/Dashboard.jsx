import { Box, Heading, Text } from "@chakra-ui/react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box p={10}>
      <Heading>
        Welcome {user?.name}
      </Heading>

      <Text mt={4}>
        SOC Dashboard Coming Next...
      </Text>
    </Box>
  );
}

export default Dashboard;