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
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

import { useAuth } from "../../context/AuthContext";

function UserTable({ users, onRoleChange }) {
  const { user } = useAuth();
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
          {users.map((u) => (
            <Tr key={u._id}>
              <Td>{u.name}</Td>

              <Td>{u.email}</Td>

              <Td>
                {user?.role === "Admin" ? (
                  <Select
                    size="sm"
                    value={u.role}
                    onChange={(e) =>
                      onRoleChange(u._id, e.target.value)
                    }
                  >
                    <option value="Admin">Admin</option>
                    <option value="Analyst">Analyst</option>
                  </Select>
                ) : (
                  <Badge
                    colorScheme={
                      u.role === "Admin"
                        ? "red"
                        : "green"
                    }
                  >
                    {u.role}
                  </Badge>
                )}
              </Td>

              <Td>
                {new Date(u.createdAt).toLocaleDateString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default UserTable;