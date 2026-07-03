import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  CheckCircleIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";

function PermissionsCard() {
  const bg = useColorModeValue("white", "gray.800");

  const allowed = [
    "Upload Logs",
    "View Dashboard",
    "View Threats",
    "Live Monitoring",
    "Generate Reports",
  ];

  const denied = [
    "Manage Users",
    "Change User Roles",
    "System Settings",
  ];

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      mt={6}
    >
      <Heading size="md" mb={6}>
        🔐 My Permissions
      </Heading>

      <VStack align="stretch" spacing={4}>

        {allowed.map((item) => (
          <HStack key={item}>
            <Icon
              as={CheckCircleIcon}
              color="green.500"
            />
            <Text>{item}</Text>
          </HStack>
        ))}

        {denied.map((item) => (
          <HStack key={item}>
            <Icon
              as={NotAllowedIcon}
              color="red.500"
            />
            <Text>{item}</Text>
          </HStack>
        ))}

      </VStack>
    </Box>
  );
}

export default PermissionsCard;