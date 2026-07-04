import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

function ConfirmDialog({
  isOpen,
  onClose,
  cancelRef,
  title,
  message,
  confirmText = "Delete",
  confirmColor = "red",
  onConfirm,
}) {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>

        <AlertDialogContent>

          <AlertDialogHeader>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {message}
          </AlertDialogBody>

          <AlertDialogFooter>

            <Button
              ref={cancelRef}
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              colorScheme={confirmColor}
              ml={3}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ConfirmDialog;