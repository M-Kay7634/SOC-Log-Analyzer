import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import StatusBadge from "../common/StatusBadge";
import { memo } from "react";

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
          <Text>{user.name || "-"}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontWeight="bold">Email</Text>
          <Text>{user.email || "-"}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontWeight="bold">Role</Text>

          <StatusBadge
            value={user.role}
            type="role"
          />
        </HStack>

        <HStack justify="space-between">
          <Text fontWeight="bold">
            Member Since
          </Text>

          <Text>
            {new Date(
              user.createdAt
            ).toLocaleDateString(
              "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default memo(MyProfileCard);