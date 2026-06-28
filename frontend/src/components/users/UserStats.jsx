import { SimpleGrid } from "@chakra-ui/react";
import SummaryCard from "../dashboard/SummaryCard";

function UserStats({ users }) {
  const totalUsers = users.length;

  const admins = users.filter(
    (user) => user.role === "Admin"
  ).length;

  const analysts = users.filter(
    (user) => user.role === "Analyst"
  ).length;

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={6}
      mb={8}
    >
      <SummaryCard
        title="Total Users"
        value={totalUsers}
        color="blue.500"
      />

      <SummaryCard
        title="Admins"
        value={admins}
        color="red.500"
      />

      <SummaryCard
        title="Analysts"
        value={analysts}
        color="green.500"
      />
    </SimpleGrid>
  );
}

export default UserStats;