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
  TableContainer,
} from "@chakra-ui/react";

import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";

function UserTable({ users, onRoleChange }) {
  const { user } = useAuth();
  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );
  const hoverBg = useColorModeValue(
      "gray.50",
      "gray.700"
  );
  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={5}>
        Registered Users ({users.length})
      </Heading>

      <TableContainer>
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
            {users.length === 0 ? (
              <Tr>
                  <Td colSpan={4}>
                      <EmptyState
                          title="No Users Found"
                          description="No registered users available."
                      />
                  </Td>
              </Tr>
          ) : (
            users.map((u) => (
              <Tr key={u._id} _hover={{bg: hoverBg,}}>
                <Td>{u.name}</Td>

                <Td>{u.email}</Td>

                <Td>
                  {user?.role === "Admin" ? (
                    u._id === user.id ? (
                      <StatusBadge
                        value={u.role}
                        type="role"
                      />
                    ) : (
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
                    )
                  ) : (
                    <StatusBadge
                      value={u.role}
                      type="role"
                    />
                  )}
                </Td>

                <Td>
                  {new Date(u.createdAt).toLocaleDateString()}
                </Td>
              </Tr>
            ))
          )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserTable;