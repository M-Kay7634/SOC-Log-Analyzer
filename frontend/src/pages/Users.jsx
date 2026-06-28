import { useEffect, useState } from "react";
import { Heading, Spinner, Center } from "@chakra-ui/react";

import DashboardLayout from "../layouts/DashboardLayout";
import UserTable from "../components/users/UserTable";
import UserStats from "../components/users/UserStats";

import { getAllUsers } from "../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Center h="300px">
          <Spinner size="xl" />
        </Center>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Heading mb={6}>Users Management</Heading>

      <UserStats users={users} />

      <UserTable users={users} />
    </DashboardLayout>
  );
}

export default Users;