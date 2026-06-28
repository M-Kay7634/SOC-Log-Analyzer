import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/authService";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email || !otp) {
      navigate("/forgot-password");
    }
  }, [email, otp, navigate]);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const data = await resetPassword(
        email,
        otp,
        newPassword
      );

      toast({
        title: data.message,
        description: "Please login with your new password.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");

    } catch (error) {
      toast({
        title:
          error.response?.data?.message ||
          "Password reset failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={20}>
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
      >
        <Heading mb={3} textAlign="center">
          Reset Password
        </Heading>

        <Text
          mb={6}
          textAlign="center"
          color="gray.600"
        >
          Create a new password for your account.
        </Text>

        <VStack spacing={5}>

          <FormControl>
            <FormLabel>New Password</FormLabel>

            <Input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="Enter new password"
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
              placeholder="Confirm password"
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            onClick={handleResetPassword}
            isLoading={loading}
          >
            Reset Password
          </Button>

        </VStack>
      </Box>
    </Container>
  );
}

export default ResetPassword;