import {
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";

import {
  NavLink,
} from "react-router-dom";

import {
  FaHome,
  FaUpload,
  FaShieldAlt,
  FaUsers,
  FaCog,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";

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
  return (
    <Box
      w="250px"
      bg="#111827"
      color="white"
      minH="100vh"
      p={6}
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        mb={10}
      >
        SOC
      </Text>

      <VStack align="stretch" gap={2}>
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
              <Box display="flex" alignItems="center" gap={3}>
                <Icon />
                <Text>{item.name}</Text>
              </Box>
            </NavLink>
          );
        })}
      </VStack>
    </Box>
  );
}

export default Sidebar;