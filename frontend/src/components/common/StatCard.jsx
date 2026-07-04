import {
  Box,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function StatCard({
  title,
  value,
  subtitle,
  borderColor = "blue.400",
}) {
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      shadow="lg"
      borderTop="5px solid"
      borderColor={borderColor}
      transition="0.3s"
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
      }}
    >
      <Text
        fontSize="md"
        color={textColor}
        fontWeight="600"
      >
        {title}
      </Text>

      <Heading
        mt={4}
        size="2xl"
        color={headingColor}
      >
        {value}
      </Heading>

      {subtitle && (
        <Text
          mt={2}
          fontSize="sm"
          color={textColor}
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
}

export default StatCard;