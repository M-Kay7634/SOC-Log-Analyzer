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
  Progress,
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 30;
    if (password.length < 8) return 60;
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return 100;
    }
    return 80;
  };

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
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
              onKeyDown={handleKeyPress}
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
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Progress
                value={getPasswordStrength()}
                mt={2}
                borderRadius="md"
              />

              <Text fontSize="sm" color="gray.500">
                {getPasswordStrength() < 40
                  ? "Weak Password"
                  : getPasswordStrength() < 80
                  ? "Medium Password"
                  : "Strong Password"}
              </Text>
          </FormControl>

          <FormControl>
            <FormLabel>Confirm Password</FormLabel>

            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                onKeyDown={handleKeyPress}
                placeholder="Confirm password"
              />

              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
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