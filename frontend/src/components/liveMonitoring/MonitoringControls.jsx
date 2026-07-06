import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiPlay,
  FiSquare,
} from "react-icons/fi";
import { memo } from "react";
import StatusBadge from '../common/StatusBadge';

function MonitoringControls({
  status,
  onStart,
  onStop,
}) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      mb={6}
    >
      <Heading size="md" mb={5}>
        Monitoring Controls
      </Heading>

      <VStack align="stretch" spacing={5}>
        <HStack spacing={4}>
          <Button
            leftIcon={<FiPlay />}
            colorScheme="green"
            flex={1}
            onClick={onStart}
            isDisabled={status === "Running"}
          >
            {status === "Running"
              ? "Monitoring Running"
              : "Start Monitoring"
            }
          </Button>

          <Button
            leftIcon={<FiSquare />}
            colorScheme="red"
            flex={1}
            onClick={onStop}
            isDisabled={status !== "Running"}
          >
            {status === "Running"
              ? "Stop Monitoring"
              : "Monitoring Stopped"
            }
          </Button>
        </HStack>

        <HStack>
          <Text fontWeight="bold">
            Current Status:
          </Text>

          <StatusBadge
            value={status}
            type="monitoring"
          />
        </HStack>
      </VStack>
    </Box>
  );
}

export default memo(MonitoringControls);