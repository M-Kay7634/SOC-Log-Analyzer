import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";

import { changePassword } from "../../services/authService";

function ChangePasswordCard() {
  const toast = useToast();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );

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
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        🔒 Change Password
      </Heading>

      <Divider mb={5} />

      <VStack spacing={5}>

        <FormControl>
          <FormLabel>Current Password</FormLabel>

          <Input
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>New Password</FormLabel>

          <Input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Confirm Password</FormLabel>

          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
        </FormControl>

        <Button
          colorScheme="blue"
          width="100%"
          isLoading={loading}
          onClick={handleUpdatePassword}
        >
          Update Password
        </Button>

      </VStack>
    </Box>
  );
}

export default ChangePasswordCard;