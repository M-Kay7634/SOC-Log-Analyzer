import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Switch,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

function EmailSettings({
  settings,
  onChange,
  onSave,
  onTest,
  isAdmin,
}) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <Heading size="md" mb={6}>
        📧 Email Alert Settings
      </Heading>

      <VStack spacing={5} align="stretch">

        <FormControl>
          <FormLabel>
            Alert Email
          </FormLabel>

          <Input
            value={settings.alertEmail}
            isDisabled={!isAdmin}
            onChange={(e) =>
              onChange(
                "alertEmail",
                e.target.value
              )
            }
          />
        </FormControl>

        <HStack justify="space-between">
          <FormLabel mb={0}>
            Enable Email Alerts
          </FormLabel>

          <Switch
            isChecked={settings.emailAlertsEnabled}
            isDisabled={!isAdmin}
            onChange={(e) =>
              onChange(
                "emailAlertsEnabled",
                e.target.checked
              )
            }
          />
        </HStack>

        <HStack justify="space-between">
          <FormLabel mb={0}>
            High Alerts
          </FormLabel>

          <Switch
            isChecked={settings.highAlerts}
            isDisabled={!isAdmin}
            onChange={(e) =>
              onChange(
                "highAlerts",
                e.target.checked
              )
            }
          />
        </HStack>

        <HStack justify="space-between">
          <FormLabel mb={0}>
            Critical Alerts
          </FormLabel>

          <Switch
            isChecked={settings.criticalAlerts}
            isDisabled={!isAdmin}
            onChange={(e) =>
              onChange(
                "criticalAlerts",
                e.target.checked
              )
            }
          />
        </HStack>

        <HStack>

          {isAdmin && (
              <Button
                  colorScheme="orange"
                  onClick={onTest}
              >
                  Send Test Email
              </Button>
          )}
          
          {isAdmin && (
            <Button
              colorScheme="blue"
              onClick={onSave}
            >
              Save Settings
            </Button>
          )}

        </HStack>

      </VStack>

    </Box>
  );
}

export default EmailSettings;