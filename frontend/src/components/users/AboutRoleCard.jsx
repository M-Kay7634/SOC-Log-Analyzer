import {
  Box,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { memo } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const RESPONSIBILITIES = [
  "Upload and analyze log files",
  "Monitor live log activity",
  "Investigate detected threats",
  "Generate investigation reports",
  "Review attack origins and threat statistics",
];

function AboutRoleCard() {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
      mt={6}
    >
      <Heading size="md" mb={5}>
        ℹ️ About Your Role
      </Heading>

      <Text mb={4}>
        As an <strong>Analyst</strong>, you are responsible for monitoring,
        investigating and responding to security events detected by the SOC
        Log Analyzer.
      </Text>

      <VStack align="stretch" spacing={4}>
        <List spacing={3}>
          {RESPONSIBILITIES.map((item) => (
            <ListItem key={item}>
              <ListIcon
                as={CheckCircleIcon}
                color="green.500"
              />
              {item}
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}

export default memo(AboutRoleCard);