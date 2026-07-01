import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

function AttackOriginCard({
  origins = [],
}) {
  const bg = useColorModeValue(
    "white",
    "gray.800"
  );

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading
        size="md"
        mb={5}
      >
        🌍 Attack Origins
      </Heading>

      <VStack
        align="stretch"
        spacing={3}
      >
        {origins.length === 0 ? (
          <Text>
            No threat data available.
          </Text>
        ) : (
          origins.map((item, index) => (
            <HStack
              key={index}
              justify="space-between"
            >
              <Text>
                {item.country || "Unknown"}
              </Text>

              <Badge
                colorScheme="red"
              >
                {item.attacks}
              </Badge>
            </HStack>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default AttackOriginCard;