import { Box } from "@chakra-ui/react";
import useThemeColors from "../../hooks/useThemeColors";

function PageCard({ children, ...props }) {
  const { cardBg } = useThemeColors();

  return (
    <Box
      bg={cardBg}
      p={8}
      rounded="lg"
      shadow="lg"
      w="100%"
      {...props}
    >
      {children}
    </Box>
  );
}

export default PageCard;