import {
  Box,
  VStack,
  Text,
  Avatar,
  Button,
  Flex,
  Divider,
  Image,
} from "@chakra-ui/react";

import {NavLink, useNavigate,} from "react-router-dom";

import {
  FaHome,
  FaUpload,
  FaShieldAlt,
  FaUsers,
  FaCog,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import logo from '../../assets/SOC_Log_Analyzer.png';

const menu = [
  {
    name: "Live Monitoring",
    icon: FaChartBar,
    path: "/live-monitoring",
  },
  {
    name: "Dashboard",
    icon: FaHome,
    path: "/dashboard",
  },
  {
    name: "Upload Logs",
    icon: FaUpload,
    path: "/upload",
  },
  {
    name: "Threats",
    icon: FaShieldAlt,
    path: "/threats",
  },
  {
    name: "Users",
    icon: FaUsers,
    path: "/users",
  },
  {
    name: "Reports",
    icon: FaFileAlt,
    path: "/reports",
  },
  {
    name: "Settings",
    icon: FaCog,
    path: "/settings",
  },
];

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
  <Flex
    direction="column"
    w="250px"
    bg="#111827"
    color="white"
    minH="100vh"
    p={6}
  >
    {/* Logo */}

    <Box textAlign="center" mb={10}>

      <Image
        src={logo}
        boxSize="70px"
        mx="auto"
        mb={4}
      />

      <Text
        fontSize="xl"
        fontWeight="bold"
      >
        SOC Log Analyzer
      </Text>

      <Text
        fontSize="sm"
        color="gray.400"
      >
        Security Dashboard
      </Text>

    </Box>

    {/* Menu */}

    <VStack
      align="stretch"
      gap={2}
      flex="1"
    >
      {menu.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              textDecoration: "none",
              background: isActive
                ? "#2563eb"
                : "transparent",
              borderRadius: "10px",
              padding: "14px",
              color: "white",
            })}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Icon />
              <Text>{item.name}</Text>
            </Box>
          </NavLink>
        );
      })}
    </VStack>

    <Divider
      borderColor="gray.700"
      my={5}
    />

    {/* Footer */}

    <Flex
      align="center"
      gap={3}
      mb={4}
    >
      <Avatar
        size="sm"
        name={user?.name}
      />

      <Box>

        <Text
          fontWeight="bold"
          fontSize="sm"
        >
          {user?.name}
        </Text>

        <Text
          fontSize="xs"
          color="gray.400"
        >
          {user?.role}
        </Text>

      </Box>

    </Flex>

    <Button
      colorScheme="red"
      w="100%"
      onClick={handleLogout}
    >
      Logout
    </Button>

  </Flex>
);
}

export default Sidebar;