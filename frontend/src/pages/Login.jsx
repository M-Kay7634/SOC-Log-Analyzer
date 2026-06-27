import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title:
          error.response?.data?.message ||
          "Login Failed",
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
        p={8}
        shadow="lg"
        borderRadius="lg"
        bg="white"
      >
        <Heading mb={6} textAlign="center">
          SOC Log Analyzer
        </Heading>

        <Text mb={6} color="gray.500">
          Sign in to continue
        </Text>

        <Stack spacing={4}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            colorScheme="blue"
            onClick={handleLogin}
            isLoading={loading}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Login;