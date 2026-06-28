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
} from "@chakra-ui/react";

import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
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

      await registerUser({
        name,
        email,
        password,
      });

      toast({
        title: "Registration Successful",
        description: "Please login with your account.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");

    } catch (err) {
      toast({
        title:
          err.response?.data?.message ||
          "Registration Failed",
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
        bg="white"
        rounded="lg"
        shadow="lg"
      >
        <Heading mb={6} textAlign="center">
          Create Account
        </Heading>

        <VStack spacing={4}>

          <FormControl>
            <FormLabel>Full Name</FormLabel>

            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter full name"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>

            <Input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter email"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>

            <Input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
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
            onClick={handleSubmit}
            isLoading={loading}
          >
            Register
          </Button>

          <Text>
            Already have an account?{" "}
            <Link
              as={RouterLink}
              color="blue.500"
              to="/login"
            >
              Login
            </Link>
          </Text>

        </VStack>
      </Box>
    </Container>
  );
}

export default Register;