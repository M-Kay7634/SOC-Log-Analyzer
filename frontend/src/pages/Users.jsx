import { useEffect, useState } from "react";
import { Heading, Center, useToast, useColorModeValue } from "@chakra-ui/react";

import { useAuth } from "../context/AuthContext";
import MyProfileCard from "../components/users/MyProfileCard";
import PermissionsCard from "../components/users/PermissionsCard";
import AboutRoleCard from "../components/users/AboutRoleCard";
import MyActivityCard from "../components/users/MyActivityCard";

import DashboardLayout from "../layouts/DashboardLayout";
import UserTable from "../components/users/UserTable";
import UserStats from "../components/users/UserStats";
import LoadingSkeleton from '../components/common/LoadingSkeleton';

import { getAllUsers, updateUserRole, getMyActivity } from "../services/userService";

function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState(null);
  const toast = useToast();

  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );

  useEffect(() => {
    if (user.role === "Admin") {
      fetchUsers();
    } else {
      fetchActivity();
    }
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

  const fetchActivity = async () => {
    try {
      const data = await getMyActivity();
      setActivity(data.activity);
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
        <LoadingSkeleton />
      </DashboardLayout>
    );
  }

    // Admin View
    if (user.role === "Admin") {
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

    // Analyst View
    return (
      <DashboardLayout>
        <Heading mb={6}>My Account</Heading>

        <MyProfileCard user={user} />

        <PermissionsCard />
        <AboutRoleCard />

        <MyActivityCard
          stats={activity}
        />
      </DashboardLayout>
    );
}

export default Users;