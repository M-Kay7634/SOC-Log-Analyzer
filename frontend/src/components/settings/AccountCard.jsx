import {
  Badge,
  Box,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

function AccountCard({ user }) {
  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );
  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        👤 Account Information
      </Heading>

      <Divider mb={5} />

      <VStack align="start" spacing={4}>

        <HStack justify="space-between" w="100%">
          <Text fontWeight="bold">Name</Text>
          <Text>{user?.name}</Text>
        </HStack>

        <HStack justify="space-between" w="100%">
          <Text fontWeight="bold">Email</Text>
          <Text>{user?.email}</Text>
        </HStack>

        <HStack justify="space-between" w="100%">
          <Text fontWeight="bold">Role</Text>

          <Badge
            colorScheme={
              user?.role === "Admin"
                ? "red"
                : "green"
            }
          >
            {user?.role}
          </Badge>
        </HStack>

        <HStack justify="space-between" w="100%">
          <Text fontWeight="bold">
            Member Since
          </Text>

          <Text>
            {user?.createdAt
              ? new Date(
                  user.createdAt
                ).toLocaleDateString()
              : "-"}
          </Text>
        </HStack>

      </VStack>
    </Box>
  );
}

export default AccountCard;