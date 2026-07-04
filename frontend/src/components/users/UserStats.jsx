import { SimpleGrid } from "@chakra-ui/react";
import StatCard from "../common/StatCard";

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
      <StatCard
        title="Total Users"
        value={totalUsers}
        borderColor="blue.500"
      />

      <StatCard
        title="Admins"
        value={admins}
        borderColor="red.500"
      />

      <StatCard
        title="Analysts"
        value={analysts}
        borderColor="green.500"
      />
    </SimpleGrid>
  );
}

export default UserStats;