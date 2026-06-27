import { Box, Heading, Text } from "@chakra-ui/react";

function SummaryCard({ title, value, color }) {
  return (
    <Box
      bg="white"
      p={6}
      rounded="lg"
      shadow="lg"
      borderTop="5px solid"
      borderColor={color}
      transition="0.3s"
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
      }}
    >
      <Text
        fontSize="md"
        color="gray.600"
        fontWeight="600"
      >
        {title}
      </Text>

      <Heading
        mt={4}
        size="2xl"
        color="gray.800"
      >
        {value}
      </Heading>
    </Box>
  );
}

export default SummaryCard;