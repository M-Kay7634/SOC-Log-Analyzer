import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { verifyOTP } from "../services/authService";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const email = location.state?.email;

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .trim();

    if (!/^\d{6}$/.test(pasted)) return;

    const digits = pasted.split("");

    setOtp(digits);

    digits.forEach((digit, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = digit;
      }
    });

    inputRefs.current[5].focus();
  };
  const handleVerifyOTP = async () => {
        const enteredOTP = otp.join("");

        if (enteredOTP.length !== 6) {
            toast({
            title: "Please enter the complete OTP",
            status: "warning",
            duration: 3000,
            isClosable: true,
            });
            return;
        }

        try {
            setLoading(true);

            const data = await verifyOTP(
            email,
            enteredOTP
            );

            toast({
            title: data.message,
            status: "success",
            duration: 2000,
            isClosable: true,
            });

            navigate("/reset-password", {
            state: {
                email,
                otp: enteredOTP,
            },
            });

        } catch (error) {
            toast({
            title:
                error.response?.data?.message ||
                "OTP verification failed",
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
          Verify OTP
        </Heading>

        <Text
          mb={6}
          color="gray.600"
          textAlign="center"
        >
          Enter the 6-digit OTP sent to
        </Text>

        <Text
          mb={8}
          fontWeight="bold"
          textAlign="center"
          color="blue.500"
        >
          {email}
        </Text>

        <FormControl>
          <FormLabel>OTP</FormLabel>

          <HStack justify="space-between">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) =>
                  (inputRefs.current[index] = el)
                }
                maxLength={1}
                textAlign="center"
                fontSize="2xl"
                value={digit}
                onPaste={handlePaste}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
              />
            ))}
          </HStack>
        </FormControl>

        <VStack mt={8}>
          <Button
                colorScheme="blue"
                width="100%"
                onClick={handleVerifyOTP}
                isLoading={loading}
            >
                Verify OTP
            </Button>
        </VStack>
      </Box>
    </Container>
  );
}

export default VerifyOTP;