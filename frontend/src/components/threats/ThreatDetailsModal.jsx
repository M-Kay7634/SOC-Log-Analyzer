import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
} from "@chakra-ui/react";

function ThreatDetailsModal({
  isOpen,
  onClose,
  threat,
}) {
  if (!threat) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Threat Details</ModalHeader>

        <ModalCloseButton />

        <ModalBody pb={6}>
          <VStack align="start" spacing={3}>

            <Text><b>IP:</b> {threat.ip}</Text>

            <Text><b>Threat:</b> {threat.threatType}</Text>

            <Text><b>Severity:</b> {threat.severity}</Text>

            <Text><b>Priority:</b> {threat.priority}</Text>

            <Text><b>MITRE:</b> {threat.mitreTechnique}</Text>

            <Text><b>Description:</b> {threat.description}</Text>

            <Text><b>Method:</b> {threat.method}</Text>

            <Text><b>URL:</b> {threat.url}</Text>

            <Text><b>Status:</b> {threat.status}</Text>

            <Text><b>Timestamp:</b> {threat.timestamp}</Text>

          </VStack>
        </ModalBody>

      </ModalContent>
    </Modal>
  );
}

export default ThreatDetailsModal;