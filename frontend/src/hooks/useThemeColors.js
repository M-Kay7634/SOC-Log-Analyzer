import { useColorModeValue } from "@chakra-ui/react";

const useThemeColors = () => {
  return {
    // Backgrounds
    pageBg: useColorModeValue("gray.50", "gray.900"),
    cardBg: useColorModeValue("white", "gray.800"),
    infoBg: useColorModeValue("gray.50", "gray.700"),
    statBg: useColorModeValue("gray.50", "gray.700"),

    // Borders
    borderColor: useColorModeValue("gray.200", "gray.600"),
    uploadBorder: useColorModeValue("blue.300", "blue.500"),

    // Text
    primaryText: useColorModeValue("gray.800", "white"),
    secondaryText: useColorModeValue("gray.600", "gray.400"),

    // Status Colors
    successBg: useColorModeValue("green.50", "green.900"),
    warningBg: useColorModeValue("yellow.50", "yellow.900"),
    dangerBg: useColorModeValue("red.50", "red.900"),
  };
};

export default useThemeColors;