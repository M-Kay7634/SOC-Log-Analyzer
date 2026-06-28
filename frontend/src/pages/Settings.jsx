import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { changePassword } from "../services/authService";
import AccountCard from "../components/settings/AccountCard";
import ChangePasswordCard from "../components/settings/ChangePasswordCard";
import AppearanceCard from "../components/settings/AppearanceCard";

function Settings() {
  const { user } = useAuth();

  const toast = useToast();

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 3000,
      });

      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
      });

      return;
    }

    try {
      setLoading(true);

      const data = await changePassword(
        currentPassword,
        newPassword
      );

      toast({
        title: data.message,
        status: "success",
        duration: 3000,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      toast({
        title:
          error.response?.data?.message ||
          "Password update failed",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Heading mb={8}>Settings</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>

        <AccountCard user={user} />

        <ChangePasswordCard />

        <AppearanceCard />

      </SimpleGrid>
    </DashboardLayout>
  );
}

export default Settings;