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
  Link,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";
import {
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";

import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const cardBg = useColorModeValue("white", "gray.800");

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: "Please enter your email",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const data = await forgotPassword(email);

      toast({
        title: data.message,
        description: "Check your inbox for the OTP.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (error) {
      toast({
        title:
          error.response?.data?.message ||
          "Failed to send OTP",
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
        color={cardBg}
      >
        <Heading mb={6} textAlign="center">
          Forgot Password
        </Heading>

        <Text
          color="gray.600"
          mb={6}
          textAlign="center"
        >
          Enter your registered email to receive a
          password reset OTP.
        </Text>

        <VStack spacing={5}>

          <FormControl>
            <FormLabel>Email Address</FormLabel>

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </FormControl>

          <Button
            width="100%"
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Send OTP
          </Button>

          <Link
            as={RouterLink}
            to="/login"
            color="blue.500"
          >
            ← Back to Login
          </Link>

        </VStack>
      </Box>
    </Container>
  );
}

export default ForgotPassword;