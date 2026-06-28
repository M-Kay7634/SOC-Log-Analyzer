import {
  Badge,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

function UserTable({ users }) {
  return (
    <Box
      bg="white"
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Registered Users
      </Heading>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Created</Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user.name}</Td>

              <Td>{user.email}</Td>

              <Td>
                <Badge
                  colorScheme={
                    user.role === "Admin"
                      ? "red"
                      : "green"
                  }
                >
                  {user.role}
                </Badge>
              </Td>

              <Td>
                {new Date(user.createdAt).toLocaleDateString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default UserTable;