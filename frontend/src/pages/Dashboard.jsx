import DashboardLayout from "../layouts/DashboardLayout";
import { Heading, Text } from "@chakra-ui/react";

function Dashboard() {
  return (
    <DashboardLayout>
      <Heading>
        Dashboard
      </Heading>

      <Text mt={4}>
        Dashboard Widgets Coming Next...
      </Text>
    </DashboardLayout>
  );
}

export default Dashboard;