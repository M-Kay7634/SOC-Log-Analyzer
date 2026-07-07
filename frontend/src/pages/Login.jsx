import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const cardBg = useColorModeValue("white", "gray.800");

  const handleSubmit = async () => {
    if (!email || !password) {
      toast({
        title: "Please fill all fields",
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

      login(data.user, data.token);

      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Login Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Container maxW="md" py={20}>
      <Box p={8} bg="white" rounded="lg" shadow="lg" color={cardBg}>
        <Heading mb={6} textAlign="center">
          SOC Log Analyzer
        </Heading>

        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter email"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter password"
              />

              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Box w="100%" textAlign="right">
            <Link
              as={RouterLink}
              to="/forgot-password"
              color="blue.500"
              fontSize="sm"
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            colorScheme="blue"
            width="100%"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Login
          </Button>
        </VStack>
        <Text>
          Don't have an account?{" "}
          <Link
            as={RouterLink}
            color="blue.500"
            to="/register"
          >
            Register
          </Link>
        </Text>
      </Box>
    </Container>
  );
}

export default Login;