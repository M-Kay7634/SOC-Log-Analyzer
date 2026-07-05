import { SimpleGrid } from "@chakra-ui/react";
import { memo, useMemo } from "react";
import StatCard from "../common/StatCard";

function UserStats({ users }) {
  const stats = useMemo(() => {
    return {
      totalUsers: users.length,

      admins: users.filter(
        (user) => user.role === "Admin"
      ).length,

      analysts: users.filter(
        (user) => user.role === "Analyst"
      ).length,
    };
  }, [users]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={6}
      mb={8}
    >
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        borderColor="blue.500"
      />

      <StatCard
        title="Admins"
        value={stats.admins}
        borderColor="red.500"
      />

      <StatCard
        title="Analysts"
        value={stats.analysts}
        borderColor="green.500"
      />
    </SimpleGrid>
  );
}

export default memo(UserStats);