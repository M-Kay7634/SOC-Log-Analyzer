import {
  Box,
  Skeleton,
  SkeletonText,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

function LoadingSkeleton({
  cards = 4,
}) {
  const bg = useColorModeValue(
    "white",
    "gray.800"
  );

  return (
    <VStack spacing={5}>
      {Array.from({ length: cards }).map(
        (_, index) => (
          <Box
            key={index}
            bg={bg}
            p={6}
            rounded="lg"
            shadow="md"
            w="100%"
          >
            <Skeleton
              height="30px"
              mb={5}
            />

            <SkeletonText
              noOfLines={4}
              spacing={4}
            />
          </Box>
        )
      )}
    </VStack>
  );
}

export default LoadingSkeleton;