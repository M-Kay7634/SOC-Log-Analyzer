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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { changePassword } from "../services/authService";
import AccountCard from "../components/settings/AccountCard";
import ChangePasswordCard from "../components/settings/ChangePasswordCard";
import AppearanceCard from "../components/settings/AppearanceCard";
import EmailSettings from "../components/settings/EmailSettings";
import {
  getSettings,
  updateSettings,
  sendTestEmail,
} from "../services/settingsService";

function Settings() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";

  const toast = useToast();

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailSettings, setEmailSettings] = useState({
    alertEmail: "",
    emailAlertsEnabled: true,
    highAlerts: true,
    criticalAlerts: true,
  });

  useEffect(() => {

    const loadSettings = async () => {

      try {

        const data =
          await getSettings();

        setEmailSettings(data.settings);

      } catch (err) {
        console.error(err);
      }

    };

    loadSettings();

  }, []);

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

  const handleEmailChange = (field, value) => {
    setEmailSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveEmailSettings = async () => {
    try {

      const data =
        await updateSettings(emailSettings);

      toast({
        title: data.message,
        status: "success",
        duration: 3000,
      });

    } catch (error) {

      toast({
        title: "Unable to save settings",
        status: "error",
        duration: 3000,
      });

    }
  };

  const handleTestEmail = async () => {

    try {

      const data =
        await sendTestEmail();

      toast({
        title: data.message,
        status: "success",
        duration: 3000,
      });

    } catch (error) {

      toast({
        title: "Unable to send email",
        status: "error",
        duration: 3000,
      });

    }

  };

  return (
    <DashboardLayout>
      <Heading mb={8}>Settings</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>

        <AccountCard user={user} />

        <ChangePasswordCard />

        <AppearanceCard />

        {!isAdmin && (
          <Alert
            status="info"
            mb={4}
            borderRadius="md"
          >
            <AlertIcon />
            Only administrators can modify email alert settings.
          </Alert>
        )}
        <EmailSettings
          settings={emailSettings}
          onChange={handleEmailChange}
          onSave={handleSaveEmailSettings}
          onTest={handleTestEmail}
          isAdmin={isAdmin}
        />

      </SimpleGrid>
    </DashboardLayout>
  );
}

export default Settings;