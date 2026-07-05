import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { memo } from "react";

import StatusBadge from "../common/StatusBadge";

function ThreatDetailsModal({
  isOpen,
  onClose,
  threat,
}) {
  if (!threat) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />

      <ModalContent maxH="80vh">
        <ModalHeader>Threat Investigation  Details</ModalHeader>

        <ModalCloseButton />

        <ModalBody pb={6} overflowY="auto">
          <VStack align="start" spacing={3}>

            <HStack
              justify="space-between"
              w="100%"
            >
              <Text fontWeight="bold">
                IP
              </Text>

              <Text>{threat.ip}</Text>
            </HStack>

            <Text><b>Threat:</b> {threat.threatType}</Text>

            <Text><b>Severity:</b> {threat.severity}</Text>

            <Text>
              <b>Priority:</b>{" "}
              <StatusBadge
                value={threat.priority}
                type="priority"
              />
            </Text>

            <Text><b>MITRE:</b> {threat.mitreTechnique || "-"}</Text>

            <Text><b>Description:</b> {threat.description || "-"}</Text>

            <Text><b>Method:</b> {threat.method || "-"}</Text>

            <Text><b>URL:</b> {threat.url || "-"}</Text>

            <Text>
              <b>Status:</b>{" "}
              <StatusBadge
                value={threat.status || "-"}
                type="status"
              />
            </Text>

            <Text>
              <b>Timestamp:</b>{" "}
              {threat.timestamp
                ? new Date(
                    threat.timestamp
                  ).toLocaleString()
                : "-"}
            </Text>

          </VStack>
        </ModalBody>

      </ModalContent>
    </Modal>
  );
}

export default memo(ThreatDetailsModal);