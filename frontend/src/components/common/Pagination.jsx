import {
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";

function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <HStack
      justify="space-between"
      mt={6}
    >
      <Button
        onClick={onPrevious}
        isDisabled={page === 1}
      >
        Previous
      </Button>

      <Text
        fontWeight="bold"
      >
        Page {page} of {totalPages}
      </Text>

      <Button
        onClick={onNext}
        isDisabled={page === totalPages}
      >
        Next
      </Button>
    </HStack>
  );
}

export default Pagination;