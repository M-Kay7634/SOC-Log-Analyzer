import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

function MyProfileCard({ user }) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={6}>
        👤 My Profile
      </Heading>

      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Text fontWeight="bold">Name</Text>
          <Text>{user.name}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontWeight="bold">Email</Text>
          <Text>{user.email}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontWeight="bold">Role</Text>

          <Badge
            colorScheme={
              user.role === "Admin"
                ? "red"
                : "green"
            }
          >
            {user.role}
          </Badge>
        </HStack>

        <HStack justify="space-between">
          <Text fontWeight="bold">
            Member Since
          </Text>

          <Text>
            {new Date(
              user.createdAt
            ).toLocaleDateString()}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default MyProfileCard;