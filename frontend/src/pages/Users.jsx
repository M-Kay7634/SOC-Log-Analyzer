import { useEffect, useState } from "react";
import { Heading, Spinner, Center, useToast, useColorModeValue } from "@chakra-ui/react";

import DashboardLayout from "../layouts/DashboardLayout";
import UserTable from "../components/users/UserTable";
import UserStats from "../components/users/UserStats";

import { getAllUsers } from "../services/userService";
import { updateUserRole } from "../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );

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

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);

      toast({
        title: "Role updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Failed to update role",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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

      <UserTable
        users={users}
        onRoleChange={handleRoleChange}
      />
    </DashboardLayout>
  );
}

export default Users;