import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { memo } from "react";
import EmptyState from "../common/EmptyState";

function AttackOriginCard({
  origins,
}) {
  const bg = useColorModeValue(
    "white",
    "gray.800"
  );
  const hoverBg = useColorModeValue(
    "gray.50",
    "gray.700"
  );
  const sortedOrigins = [...origins].sort(
    (a, b) => b.attacks - a.attacks
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
        🌍 Top Attack Origin Countries
      </Heading>

      <VStack
        align="stretch"
        spacing={3}
      >
        {origins.length === 0 ? (
          <EmptyState
            title="No Attack Origins"
            description="Upload logs to view attack source countries."
          />
        ) : (
          sortedOrigins.slice(0, 5).map((item, index) => (
            <HStack
              key={item.country || index}
              justify="space-between"
              p={2}
              rounded="md"
              _hover={{
                bg: hoverBg,
              }}
>
              <Text fontWeight="600">
                🌍 {item.country || "Unknown"}
              </Text>

              <Badge
                colorScheme={
                  item.attacks >= 10
                    ? "red"
                    : item.attacks >= 5
                    ? "orange"
                    : "green"
                }
              >
                {item.attacks} attacks
              </Badge>
            </HStack>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default memo(AttackOriginCard);